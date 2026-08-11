# ==========================================================
# NOTIFICATION SERVICE
# EMERGENCY SHELTER OCCUPANCY MANAGEMENT SYSTEM
# ==========================================================


def send_notification(recipient, message):
    """
    Send a notification to a recipient.
    """

    if not recipient:
        return {
            "success": False,
            "message": "Recipient is required"
        }

    if not message:
        return {
            "success": False,
            "message": "Notification message is required"
        }

    print("\n------------------------------------------")
    print("           NOTIFICATION SENT")
    print("------------------------------------------")
    print("Recipient :", recipient)
    print("Message   :", message)
    print("------------------------------------------")

    return {
        "success": True,
        "message": "Notification sent successfully",
        "recipient": recipient
    }


def shelter_alert(shelter_name, available_spaces):
    """
    Send an alert about shelter availability.
    """

    if available_spaces == 0:
        message = (
            f"ALERT: {shelter_name} is currently FULL."
        )

    elif available_spaces <= 10:
        message = (
            f"WARNING: Only {available_spaces} spaces "
            f"are available at {shelter_name}."
        )

    else:
        message = (
            f"{shelter_name} has {available_spaces} "
            f"spaces available."
        )

    return send_notification("Shelter Administrator", message)


def emergency_notification(message):
    """
    Send an emergency notification.
    """

    return send_notification(
        "Emergency Response Team",
        "EMERGENCY: " + message
    )


def send_occupancy_update(shelter_name, occupied, capacity):
    """
    Send shelter occupancy update.
    """

    available = capacity - occupied

    message = (
        f"{shelter_name}: "
        f"{occupied}/{capacity} occupants. "
        f"{available} spaces available."
    )

    return send_notification(
        "Shelter Administrator",
        message
    )


# ==========================================================
# TEST PROGRAM
# ==========================================================

print("==========================================")
print("       NOTIFICATION SERVICE")
print("==========================================")

# Normal notification
result = send_notification(
    "Admin",
    "New emergency shelter registration received."
)

print("Status :", result["message"])


# Shelter availability alert
print("\nShelter Availability Alert")
print("--------------------------")

shelter_alert(
    "Trichy Relief Shelter",
    8
)


# Emergency notification
print("\nEmergency Notification")
print("----------------------")

emergency_notification(
    "Heavy rainfall reported in Trichy."
)


# Occupancy update
print("\nOccupancy Update")
print("----------------")

send_occupancy_update(
    "Trichy Relief Shelter",
    70,
    100
)