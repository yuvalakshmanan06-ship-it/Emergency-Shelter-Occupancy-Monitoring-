from flask import Blueprint, request, jsonify
from models.shelter import (
    create_shelter,
    get_all_shelters,
    update_occupancy
)

shelter_routes = Blueprint("shelter_routes", __name__)


@shelter_routes.route("/shelters", methods=["GET"])
def get_shelters():

    shelters = get_all_shelters()

    result = []

    for shelter in shelters:
        result.append({
            "id": shelter["id"],
            "name": shelter["name"],
            "location": shelter["location"],
            "capacity": shelter["capacity"],
            "occupied": shelter["occupied"],
            "status": shelter["status"]
        })

    return jsonify({
        "status": "success",
        "shelters": result
    })


@shelter_routes.route("/shelters", methods=["POST"])
def add_shelter():

    data = request.get_json()

    name = data.get("name")
    location = data.get("location")
    capacity = data.get("capacity")

    if not name or not location or capacity is None:
        return jsonify({
            "status": "error",
            "message": "All fields are required"
        }), 400

    create_shelter(name, location, capacity)

    return jsonify({
        "status": "success",
        "message": "Shelter created successfully"
    }), 201


@shelter_routes.route("/shelters/<int:shelter_id>/occupancy", methods=["PUT"])
def update_shelter_occupancy(shelter_id):

    data = request.get_json()

    occupied = data.get("occupied")

    if occupied is None:
        return jsonify({
            "status": "error",
            "message": "Occupied value is required"
        }), 400

    update_occupancy(shelter_id, occupied)

    return jsonify({
        "status": "success",
        "message": "Shelter occupancy updated successfully"
    })