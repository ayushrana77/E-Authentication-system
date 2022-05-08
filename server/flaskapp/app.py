from flask import Flask,jsonify,request,session
from flask_pymongo import PyMongo
import bcrypt
import jwt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS,cross_origin
from gotp import gotp

o1 = gotp()

app = Flask(__name__)
jwt = JWTManager(app)
CORS(app)

with open("database_cred.txt") as f:
    password = f.read()

app.config['MONGO_URI'] = 'mongodb+srv://admin-ayush:'+password+'@e-authaction.ef4y4.mongodb.net/e-data?retryWrites=true&w=majority'
mongo = PyMongo(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-secert-key'

@app.route("/")
def hello_world():
    return "Hello"

@app.route("/adminRegister",methods=['POST'])
def adminRegister():
    allusers = mongo.db.admins

    user = allusers.find_one({'email':request.json['email']})
    phone = allusers.find_one({'phone':request.json['phone']})

    if user:
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
        'name':request.json['Name'],
        'phone':request.json['phone'],
        'password':hashpw,
        'cpassword':hashcpw,
        'auth':False,
        'tokens':[{
            'token':str(access_token)
        }]
    })
    
    return jsonify(token = str(access_token)),201

@app.route("/adminLogin",methods=['POST'])
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

@app.route("/adminLogout",methods=['POST'])
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

@app.route('/otp',methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)