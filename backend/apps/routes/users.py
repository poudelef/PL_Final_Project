
from fastapi import APIRouter
from backend.apps.modules.users.schemas import list_users
from backend.apps.config.database import collection_users
from backend.apps.modules.users.models import Users
from bson import ObjectId

router = APIRouter()
# Get request method 
@router.get("/")
def intro():
    return {"message": "Welcome to the User Management API"}

@router.get("/users")
async def get_users():
    users = list_users(collection_users.find())
    return users

# Post User method
@router.post("/users")
async def create_user(user: Users):
    result = collection_users.insert_one(dict(user))
    return {"message": "User created", "id": str(result.inserted_id)}

 # Put request method
@router.put("/users/{user_id}")
async def update_user(user_id: str, user: Users):
    user_data = dict(user)
    user_data["_id"] = ObjectId(user_id)
    collection_users.replace_one({"_id": ObjectId(user_id)}, user_data)
    return {"message": "User updated successfully"}   

# Delete request method
@router.delete("/users/{user_id}")
async def delete_user(user_id: str):
    result = collection_users.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 1:
        return {"message": "User deleted successfully"}
    else:
        return {"message": "User not found"}, 404