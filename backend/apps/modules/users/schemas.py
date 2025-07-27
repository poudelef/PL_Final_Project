

def individual_User(user) ->dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"],
        "age": user["age"],
        "address": user["address"],
        # "registration_date": user["registration_date"]
    }

def list_users(users) -> list:
    return [individual_User(user) for user in users]