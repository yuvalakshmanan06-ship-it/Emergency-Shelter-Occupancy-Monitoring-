# ==========================================================
# EMERGENCY SHELTER MANAGEMENT
# ==========================================================

shelters = [
    {
        "id": 1,
        "name": "Trichy Relief Shelter",
        "location": "Trichy",
        "capacity": 100,
        "occupied": 65
    },
    {
        "id": 2,
        "name": "Central Emergency Shelter",
        "location": "Thanjavur",
        "capacity": 80,
        "occupied": 50
    },
    {
        "id": 3,
        "name": "Government Relief Centre",
        "location": "Madurai",
        "capacity": 120,
        "occupied": 90
    }
]


def get_shelters():
    """Return all shelter information."""
    return shelters


def get_shelter_by_id(shelter_id):
    """Find a shelter using its ID."""
    for shelter in shelters:
        if shelter["id"] == shelter_id:
            return shelter

    return None


def check_availability(shelter_id):
    """Check the available spaces in a shelter."""
    shelter = get_shelter_by_id(shelter_id)

    if shelter is None:
        return None

    available = shelter["capacity"] - shelter["occupied"]

    return {
        "shelter_id": shelter["id"],
        "shelter_name": shelter["name"],
        "capacity": shelter["capacity"],
        "occupied": shelter["occupied"],
        "available": available
    }


def add_occupants(shelter_id, count):
    """Add people to a shelter."""
    shelter = get_shelter_by_id(shelter_id)

    if shelter is None:
        return "Shelter not found."

    available = shelter["capacity"] - shelter["occupied"]

    if count <= 0:
        return "Invalid number of occupants."

    if count > available:
        return "Not enough space available."

    shelter["occupied"] += count

    return f"{count} people added successfully."


def remove_occupants(shelter_id, count):
    """Remove people from a shelter."""
    shelter = get_shelter_by_id(shelter_id)

    if shelter is None:
        return "Shelter not found."

    if count <= 0 or count > shelter["occupied"]:
        return "Invalid number of occupants."

    shelter["occupied"] -= count

    return f"{count} people removed successfully."


# ==========================================================
# MAIN PROGRAM
# ==========================================================

print("==============================================")
print("   EMERGENCY SHELTER OCCUPANCY MANAGEMENT")
print("==============================================")

print("\nAvailable Shelters:\n")

for shelter in get_shelters():
    available = shelter["capacity"] - shelter["occupied"]

    print("Shelter ID :", shelter["id"])
    print("Name       :", shelter["name"])
    print("Location   :", shelter["location"])
    print("Capacity   :", shelter["capacity"])
    print("Occupied   :", shelter["occupied"])
    print("Available  :", available)
    print("----------------------------------------------")

# Check availability
result = check_availability(1)

print("\nAvailability Check")
print("------------------")
print("Shelter :", result["shelter_name"])
print("Available Spaces :", result["available"])

# Add occupants
print("\n" + add_occupants(1, 10))

# Remove occupants
print(remove_occupants(1, 5))

# Display updated occupancy
result = check_availability(1)

print("\nUpdated Shelter Status")
print("----------------------")
print("Shelter :", result["shelter_name"])
print("Capacity :", result["capacity"])
print("Occupied :", result["occupied"])
print("Available :", result["available"])