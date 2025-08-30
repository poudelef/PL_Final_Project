
from fastapi import APIRouter, HTTPException, status
from backend.apps.modules.users.schemas import list_users, individual_User
from backend.apps.config.database import collection_users
from backend.apps.modules.users.models import Users, UserLogin
from bson import ObjectId

router = APIRouter()
# Get request method 
@router.get("/")
def intro():
    return {"message": "Welcome to the User Management API"}

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    try:
        doc = collection_users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id.")
    if not doc:
        raise HTTPException(status_code=404, detail="User not found.")
    return individual_User(doc)

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
    


@router.post("/auth/login")
def login_user(login: UserLogin):
    doc = collection_users.find_one({"email": login.email})
    if not doc:
        raise HTTPException(status_code=404, detail="User not found.")
    if login.password != doc["password"]:
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    if login.role and doc.get("role") != login.role:
        raise HTTPException(status_code=403, detail="Role mismatch.")
    return {
        "message": "Login successful",
        "user": {
            "id": str(doc["_id"]),
            "name": doc["name"],
            "email": doc["email"],
            "role": doc.get("role"),
        },
    }