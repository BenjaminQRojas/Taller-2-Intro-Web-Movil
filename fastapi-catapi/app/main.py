# app/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware  # ← NUEVO
from typing import List
from sqlalchemy.orm import Session
from . import crud, models, schemas, database

# Crear tablas
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="API Gatos - InfoMóvil")

# === AÑADE CORS AQUÍ ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes (para desarrollo)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# =======================

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/cats", response_model=List[schemas.Cat])
def read_cats(db: Session = Depends(get_db)):
    return crud.get_cats(db)

@app.get("/cats/{cat_id}", response_model=schemas.Cat)
def read_cat(cat_id: str, db: Session = Depends(get_db)):
    cat = crud.get_cat_by_id(db, cat_id)
    if not cat:
        raise HTTPException(status_code=404, detail="Gato no encontrado")
    return cat