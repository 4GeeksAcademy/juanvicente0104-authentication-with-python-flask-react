"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup',methods=['POST'])
def register_user():
    data = request.json
    user_email = data.get("email")
    user_username = data.get("username")
    user_password = data.get("password")
    user_gender = data.get("gender")
    user_rol = data.get("rol")
    user_active = data.get("is_active")

    if user_email is None or user_username is None or user_password is None or user_gender is None or user_rol is None or user_active is None:
        return jsonify({"msg":"missing data"}), 400

    check_email = User.query.filter_by(email=user_email).first()

    if check_email is not None:
        return jsonify({"msg":"User already exists"}), 400

    user_password = generate_password_hash(user_password)
    new_user = User(email=user_email, username=user_username, password=user_password, gender=user_gender, rol=user_rol, is_active=user_active)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg":"user created succesfully!"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"msg":f"{error}"}), 500

@api.route('/login', methods=['POST'])
def login_user():
    data = request.json
    data_email = data.get("email")
    data_password = data.get("password")

    if data_email is None or data_password is None:
        return jsonify({"msg":"missing data"}), 400

    user = User.query.filter_by(email=data_email).one_or_none()

    if user is None:
        return jsonify({"msg":"wrong user or password"}), 400
    else:
        if check_password_hash(user.password, data_password):
            #create a token
            access_token = create_access_token(identity=data_email)
            return jsonify({"token":access_token}), 200
        else:
            return jsonify({"msg":"wrong user or password"}), 400
        
@api.route('/private',methods=['GET'])
@jwt_required()
def authenticate_user():
    current_user = get_jwt_identity()
    return jsonify({"msg":current_user})

    