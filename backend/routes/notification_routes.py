from flask import Blueprint, request, jsonify
from models.notification import (
    create_notification,
    get_notifications
)

notification_routes = Blueprint(
    "notification_routes",
    __name__
)


@notification_routes.route(
    "/notifications",
    methods=["POST"]
)
def add_notification():

    data = request.get_json()

    user_id = data.get("user_id")
    message = data.get("message")

    if not user_id or not message:
        return jsonify({
            "status": "error",
            "message": "User ID and message are required"
        }), 400

    create_notification(user_id, message)

    return jsonify({
        "status": "success",
        "message": "Notification created successfully"
    }), 201


@notification_routes.route(
    "/notifications/<int:user_id>",
    methods=["GET"]
)
def get_user_notifications(user_id):

    notifications = get_notifications(user_id)

    result = []

    for notification in notifications:
        result.append({
            "id": notification["id"],
            "user_id": notification["user_id"],
            "message": notification["message"],
            "created_at": notification["created_at"]
        })

    return jsonify({
        "status": "success",
        "notifications": result
    })