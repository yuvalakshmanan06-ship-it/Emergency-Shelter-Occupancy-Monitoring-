from flask import Blueprint, request, jsonify
from models.volunteer import (
    create_volunteer,
    get_all_volunteers
)

volunteer_routes = Blueprint(
    "volunteer_routes",
    __name__
)


@volunteer_routes.route("/volunteers", methods=["POST"])
def add_volunteer():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    shelter_id = data.get("shelter_id")

    if not name or not email or not phone or not shelter_id:
        return jsonify({
            "status": "error",
            "message": "All fields are required"
        }), 400

    create_volunteer(
        name,
        email,
        phone,
        shelter_id
    )

    return jsonify({
        "status": "success",
        "message": "Volunteer registered successfully"
    }), 201


@volunteer_routes.route("/volunteers", methods=["GET"])
def get_volunteers():

    volunteers = get_all_volunteers()

    result = []

    for volunteer in volunteers:
        result.append({
            "id": volunteer["id"],
            "name": volunteer["name"],
            "email": volunteer["email"],
            "phone": volunteer["phone"],
            "shelter_id": volunteer["shelter_id"]
        })

    return jsonify({
        "status": "success",
        "volunteers": result
    })