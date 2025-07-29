from pymongo import MongoClient # MongoClient is used to connect and interact with MongoDB database 

client = MongoClient("mongodb+srv://Sambhav:test123@home.njojdpq.mongodb.net/?retryWrites=true&w=majority&appName=Home")
# home.njojdpq.mongodb.net -> this is the MongoDB cluster address

db = client["ApartmentListingDB"] # Create a database named "ApartmentListingDB"

collection_users = db["users_collection"] # access or create a collectiion names "users_collection"
collection_apts = db["apts_collection"] # access or create a collectiion names "apts_collection"