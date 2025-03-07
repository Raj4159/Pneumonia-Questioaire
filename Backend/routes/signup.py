from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import os

# Define the FastAPI router
router = APIRouter()

# Define the request body model
class SignupRequest(BaseModel):
    email: str
    password: str

# File path for storing user data
USER_FILE_PATH = "public/user.json"

# Function to load existing users or create the file if it doesn't exist
def load_users():
    # Check if the file exists, if not create it
    if not os.path.exists(USER_FILE_PATH):
        with open(USER_FILE_PATH, "w") as file:
            json.dump([], file, indent=4)  # Initialize with an empty list
        return []

    # If the file exists, load and return users
    with open(USER_FILE_PATH, "r") as file:
        return json.load(file)

# Function to save users to the file
def save_user(user_data):
    users = load_users()
    users.append(user_data)
    with open(USER_FILE_PATH, "w") as file:
        json.dump(users, file, indent=4)

# Signup route
@router.post("/signup")
async def signup(user: SignupRequest):
    # Check if the user already exists (based on email)
    users = load_users()
    for existing_user in users:
        if existing_user["email"] == user.email:
            raise HTTPException(status_code=400, detail="User already exists.")

    # Save the new user
    save_user({"email": user.email, "password": user.password})

    return {"message": "User signed up successfully!"}
