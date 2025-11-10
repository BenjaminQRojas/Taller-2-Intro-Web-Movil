# app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def get_cats(db: Session):
    return db.query(models.Cat).all()

def get_cat_by_id(db: Session, cat_id: str):
    return db.query(models.Cat).filter(models.Cat.id == cat_id).first()