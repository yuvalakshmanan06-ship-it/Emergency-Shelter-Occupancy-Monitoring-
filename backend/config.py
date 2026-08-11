import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "emergency-shelter-secret")
    DATABASE = os.path.join(
        os.path.dirname(__file__),
        "database",
        "database.db"
    )