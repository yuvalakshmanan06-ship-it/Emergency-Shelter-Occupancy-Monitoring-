# ==========================================================
# AUTHENTICATION SERVICE
# EMERGENCY SHELTER OCCUPANCY MANAGEMENT SYSTEM
# ==========================================================

# Sample users
users = [
    {
        "id": 1,
        "username": "admin",
        "password": "admin123",
        "role": "admin"
    },
    {
        "id": 2,
        "username": "staff",
        "password": "staff123",
        "role": "staff"
    }
]


def login(username, password):
    """
    Authenticate a user using username and password.
    """

    for user in users:

        if user["username"] == username and user["password"] == password:

            return {
                "success": True,
                "message": "Login successful",
                "user_id": user["id"],
                "username": user["username"],
                "role": user["role"]
            }

    return {
        "success": False,
        "message": "Invalid username or password"
    }


def register(username, password, role="staff"):
    """
    Register a new user.
    """

    # Check whether username already exists
    for user in users:

        if user["username"] == username:

            return {
                "success": False,
                "message": "Username already exists"
            }

    new_user = {
        "id": len(users) + 1,
        "username": username,
        "password": password,
        "role": role
    }

    users.append(new_user)

    return {
        "success": True,
        "message": "User registered successfully"
    }


def logout(username):
    """
    Logout the user.
    """

    return {
        "success": True,
        "message": f"{username} logged out successfully"
    }


# ==========================================================
# TEST PROGRAM
# ==========================================================

print("==========================================")
print("       AUTHENTICATION SERVICE")
print("==========================================")

# Login test
result = login("admin", "admin123")

print("\nLogin Test")
print("----------")
print("Username :", "admin")
print("Result   :", result["message"])

if result["success"]:
    print("User ID  :", result["user_id"])
    print("Role     :", result["role"])


# Invalid login test
result = login("admin", "wrong123")

print("\nInvalid Login Test")
print("------------------")
print("Username :", "admin")
print("Result   :", result["message"])


# Registration test
result = register("volunteer", "vol123", "staff")

print("\nRegistration Test")
print("-----------------")
print("Result :", result["message"])


# Logout test
result = logout("admin")

print("\nLogout Test")
print("-----------")
print("Result :", result["message"])