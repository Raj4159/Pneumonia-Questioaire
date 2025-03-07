from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import os
import uuid  # For generating a mock token (you can replace it with a JWT library)

# Define the router
router = APIRouter()

# File path for the user data
USER_FILE_PATH = "public/user.json"

# Define the request body model
class LoginRequest(BaseModel):
    email: str
    password: str

# Function to load users from the user.json file
def load_users():
    if not os.path.exists(USER_FILE_PATH):
        raise HTTPException(status_code=500, detail="User data file does not exist.")
    
    with open(USER_FILE_PATH, "r") as file:
        return json.load(file)

# Login route to check credentials
@router.post("/login")
async def login(login_request: LoginRequest):
    users = load_users()

    # Check if the user exists
    user = next((user for user in users if user["email"] == login_request.email), None)

    if user is None:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Check if the password is correct
    if user["password"] != login_request.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create a mock token (replace this with JWT token generation in real-world scenarios)
    access_token = str(uuid.uuid4())  # You can replace this with actual JWT token generation

    return {"access_token": access_token, "message": "Login successful"}
