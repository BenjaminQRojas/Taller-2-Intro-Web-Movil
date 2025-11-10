# app/schemas.py
from pydantic import BaseModel

class Cat(BaseModel):
    id: str
    image_url: str
    breed_name: str | None = None
    origin: str | None = None
    temperament: str | None = None

    class Config:
        from_attributes = True