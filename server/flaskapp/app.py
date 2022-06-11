from flask import Flask,jsonify,request,session,send_from_directory
from flask_pymongo import PyMongo
import bcrypt
import jwt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS,cross_origin
from gotp import gotp
from dotenv import load_dotenv
import os

load_dotenv()

o1 = gotp()

app = Flask(__name__,static_folder="../../client/build",static_url_path='')
jwt = JWTManager(app)
CORS(app)


password = os.getenv("MONGODB_PASSWORD")
app.config['MONGO_URI'] = 'mongodb+srv://admin-ayush:'+password+'@e-authaction.ef4y4.mongodb.net/data?retryWrites=true&w=majority'
mongo = PyMongo(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-secert-key'

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/adminRegister",methods=['POST'])
def adminRegister():
    allusers = mongo.db.admins

    user = allusers.find_one({'email':request.json['email']})
    phone = allusers.find_one({'phone':request.json['phone']})

    if user:
        if user['auth'] == False:
            o1.getotp(request.json['email'],True)
            access_token = create_access_token(identity=request.json['email'])
            t = user['tokens']
            t.append({'token':str(access_token)})
            allusers.update_one(
                {'email':request.json['email']},
                {"$set":{'tokens':t}},
                )
            return jsonify(token=str(access_token)),201
        return jsonify(message='Email already exists'),401
    if phone:
        return jsonify(message='phone number alredy exists'),401

    if request.json['password'] != request.json['cpassword']:
        return jsonify(message='password not Matching!!!'),401
    
    hashpw = bcrypt.hashpw(
        request.json['password'].encode('utf-8'),bcrypt.gensalt()
    )
    hashcpw = bcrypt.hashpw(
        request.json['cpassword'].encode('utf-8'),bcrypt.gensalt()
    )

    access_token = create_access_token(identity=request.json['email'])
    o1.getotp(request.json['email'],True)
    allusers.insert_one({
        'email':request.json['email'],
        'name':request.json['name'],
        'lname':request.json['lname'],
        'sex':request.json['sex'],
        'education':request.json['education'],
        'phone':request.json['phone'],
        'password':hashpw,
        'cpassword':hashcpw,
        'address':request.json['address'],
        'age':request.json['age'],

        'auth':False,
        'tokens':[{
            'token':str(access_token)
        }]
    })
    
    return jsonify(token = str(access_token)),201

@app.route("/api/adminLogin",methods=['POST'])
def adminLogin():
    allusers = mongo.db.admins
    user = allusers.find_one({'email':request.json['email']})
    
    if user:
        if bcrypt.hashpw(request.json['password'].encode('utf-8'),user['password']) == user['password'] and user['auth']:
            access_token = create_access_token(identity=request.json['email'])
            t = user['tokens']
            t.append({'token':str(access_token)})
            allusers.update_one(
                {'email':request.json['email']},
                {"$set":{'tokens':t}},
                )
            return jsonify(token=str(access_token)),201
    return jsonify(message='Invalid userid/password'),401

@app.route("/api/adminLogout",methods=['POST'])
def adminLogout():
    allusers = mongo.db.admins
    user = allusers.find_one({'tokens.token':request.json['token']})

    if user:
        allusers.update_one(
            {'tokens.token':request.json['token']},
            {"$set":{'tokens':[]}},
        )
        return jsonify(message='Logout Succesfully'),201
    return jsonify(message='Lougout Failed'),401

@app.route('/api/otp',methods=['POST'])
def otp():
    allusers = mongo.db.admins
    user = allusers.find_one({'tokens.token':request.json['token']})
    if user:
        if (user['auth'] == False) and request.json['otp'] == str(o1.getotp(user['email'],False)):
            allusers.update_one(
                {'tokens.token':request.json['token']},
                {"$set":{'auth':True}}
            )
            return jsonify(message='Register Succesfully'),201
    return jsonify(message='Register  Failed'),401

@app.route('/api/profile',methods=['POST'])
def profile():
    alluser = mongo.db.admins
    user = alluser.find_one({"tokens.token":request.json['token']})
    if user:
        data = {
            "name":user['name'],
            "email":user['email'],
            "phone":user['phone'],
            "age":user['age'],
            "education":user['education'],
            "lname":user['lname'],
            "sex":user['sex'],
            "address":user['address']
        }
        if user['auth']:
            return jsonify(data),201
    return jsonify(message='User Not found'),404

if __name__ == '__main__':
    app.run(debug=True)