from flask import Flask
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

@app.route("/")
def home():
    return """
    <h1>Emergency Shelter Occupancy Monitoring Platform</h1>
    <h3>Backend is Running Successfully!</h3>
    """

@app.route("/health")
def health():
    return {
        "status": "success",
        "message": "Server is running"
    }

if __name__ == "__main__":
    app.run(debug=True)