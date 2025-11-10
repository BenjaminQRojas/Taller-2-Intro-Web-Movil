# app/models.py
from sqlalchemy import Column, String
from .database import Base

class Cat(Base):
    __tablename__ = "cats"
    id = Column(String, primary_key=True)
    image_url = Column(String, nullable=False)
    breed_name = Column(String)
    origin = Column(String)
    temperament = Column(String)