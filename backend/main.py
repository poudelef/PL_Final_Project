from fastapi import FastAPI
# from fastapi import Query
# from backend.apps.modules.users.models import User_info
# from backend.apps.modules.users.schemas import UserCreate, UserResponse
# from backend.apps.modules.landlord.models import LandLord_info, Appartment_info, ApparmentList
# from backend.apps.modules.landlord.schemas import LandlordCreate, LandlordResponse, ApartmentCreate, ApartmentResponse
# from backend.apps.modules.landlord.services import SearchFilter
# from pydantic import BaseModel
# # from typing import List
# # from backend.apps.routes.landlord import router as landlord_router
# # from backend.apps.routes.users import router as users_router
# from urllib.parse import quote_plus

from backend.apps.routes.users import router 
app = FastAPI()

app.include_router(router)
# app.include_router(landlord_router)
# app.include_router(users_router)

# Routers will be included here after creation

# users_db = []  # In-memory user storage

# landlords_db = []

# apartments_db = []

# @app.get("/")
# def root():
#     return {"message": "Welcome to the Apartment Listing API"}



# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# uri = f"mongodb+srv://Sambhav:test123@home.njojdpq.mongodb.net/?retryWrites=true&w=majority&appName=Home"
# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))
# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)