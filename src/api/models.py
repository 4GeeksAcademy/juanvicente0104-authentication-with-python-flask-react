from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class UserGender(Enum):
    male = 'male',
    female = 'female',
    other = 'other'

class UserRol(Enum):
    admin='admin',
    general='general'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    gender = db.Column(db.Enum(UserGender), unique=False, nullable=False) #Only we want to take male, female or other
    rol = db.Column(db.Enum(UserRol),unique=False,nullable=False, default="general")
    is_active = db.Column(db.Boolean(), unique=False, nullable=False,default=True) #Add default true...

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "rol": self.rol,
            "gender": self.gender
            # do not serialize the password, its a security breach
        }

