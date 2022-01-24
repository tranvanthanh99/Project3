from mongoengine import *
from models.helper import mongo_to_dict

class Size_details(Document):
    size = StringField(default="")
    price = IntField()

    def to_dict(self):
        return mongo_to_dict(self)

class Product(Document):
    image = StringField(default="")
    imageSrc = StringField(default="")
    name = StringField(default="")
    category = StringField()
    product_type = StringField()
    description = ListField(StringField())
    price = IntField()
    size = ListField(StringField())
    sizeDetails = ListField(ReferenceField(Size_details))
    available = BooleanField(default=True)
    
    def to_dict(self):
        return mongo_to_dict(self)

