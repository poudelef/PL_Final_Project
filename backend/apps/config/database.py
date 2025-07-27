from pymongo import MongoClient

client = MongoClient("mongodb+srv://Sambhav:test123@home.njojdpq.mongodb.net/?retryWrites=true&w=majority&appName=Home")

db = client["ApartmentListingDB"]

collection_users = db["users_collection"]
collection_landlords = db["landlords_collection"]