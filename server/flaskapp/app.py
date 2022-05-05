from flask import Flask,jsonify,request,session
from flask_pymongo import PyMongo
import bcrypt
import jwt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS,cross_origin

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

if __name__ == '__main__':
    app.run(debug=True)