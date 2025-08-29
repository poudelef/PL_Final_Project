# This code is used to get data from MongoDB and organize/format it before sending it back to the frontend or API user.
# MongoDB → your backend → cleaned JSON → frontend
def individual_User(user) ->dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "password": user["password"],
        "phone": user["phone"],
        "age": user["age"],
        "address": user["address"],
        "role": user["role"]
        
        
    }

def list_users(users) -> list:
    return [individual_User(user) for user in users]

# This function takes one user (from the database) and:

    # Picks out the useful info: name, email, phone, age, address

    # Converts the _id (which MongoDB uses) into a regular string and calls it "id" so it works well in your API

    # Returns everything as a simple dictionary

    # It's like cleaning up the user info so you can send it to the frontend or show it in app 