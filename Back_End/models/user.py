from mongoengine import *
from models.helper import mongo_to_dict

class User(Document):
    email = EmailField()
    password = StringField()
    role = StringField(default="user")
    firstname = StringField()
    lastname = StringField()
    phone = StringField()
    address = StringField()
    
    def to_dict(self):
        return mongo_to_dict(self)
