from flask import Blueprint, request, jsonify
from models.user import create_user, get_user_by_email

auth_routes = Blueprint("auth_routes", __name__)


@auth_routes.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "status": "error",
            "message": "All fields are required"
        }), 400

    existing_user = get_user_by_email(email)

    if existing_user:
        return jsonify({
            "status": "error",
            "message": "Email already registered"
        }), 409

    create_user(name, email, password)

    return jsonify({
        "status": "success",
        "message": "User registered successfully"
    }), 201


@auth_routes.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = get_user_by_email(email)

    if not user:
        return jsonify({
            "status": "error",
            "message": "Invalid email or password"
        }), 401

    if user["password"] != password:
        return jsonify({
            "status": "error",
            "message": "Invalid email or password"
        }), 401

    return jsonify({
        "status": "success",
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }), 200