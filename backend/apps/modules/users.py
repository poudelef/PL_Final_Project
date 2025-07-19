from datetime import date

class User_info:
    total_users = 0
    all_users = []
    def __init__(self, name=None, email=None, phone=None, age=None, address=None, ):
        self.name = name
        self.email = email
        self.phone = phone
        self.age = age
        self.address = address
        
        today = date.today()
        self.registration_date = today.strftime("%Y-%m-%d")

        User_info.total_users += 1
        User_info.all_users.append(self)
    
    def get_registration_date(self):
        return self.registration_date
    def get_name(self):
        return self.name
    def get_email(self):
        return self.email
    def get_phone(self):
        return self.phone
    def get_age(self):  
        return self.age
    def get_address(self):
        return self.address
    def get_total_users(self):
        return User_info.total_users

user1 = User_info(name="Andrew", email="andrew@mail.com", phone="111-111-1111", age=20, address="Dayton, OH")
user2 = User_info(name="Bella", email="bella@mail.com", phone="222-222-2222", age=22, address="Cincinnati, OH")
user3 = User_info(name="Carlos", email="carlos@mail.com", phone="333-333-3333", age=25, address="Columbus, OH")
user4 = User_info(name="Diana", email="diana@mail.com", phone="444-444-4444", age=23, address="Toledo, OH")
user5 = User_info(name="Ethan", email="ethan@mail.com", phone="555-555-5555", age=21, address="Cleveland, OH")
user6 = User_info(name="Fiona", email="fiona@mail.com", phone="666-666-6666", age=24, address="Akron, OH")
user7 = User_info(name="George", email="george@mail.com", phone="777-777-7777", age=26, address="Dayton, OH")
user8 = User_info(name="Hannah", email="hannah@mail.com", phone="888-888-8888", age=22, address="Cincinnati, OH")
user9 = User_info(name="Ivan", email="ivan@mail.com", phone="999-999-9999", age=23, address="Youngstown, OH")
user10 = User_info(name="Julia", email="julia@mail.com", phone="000-000-0000", age=21, address="Oxford, OH")




print(User_info.total_users)