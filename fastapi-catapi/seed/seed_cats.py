# seed/seed_cats.py
import httpx
import asyncio
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
API_KEY = os.getenv("THECATAPI_KEY")

if not API_KEY:
    raise Exception("Falta THECATAPI_KEY en .env")

engine = create_engine(DATABASE_URL)

TARGET_COUNT = 50
BATCH_SIZE = 10          # MÁXIMO SEGURO SIN API KEY, PERO CON KEY PODEMOS 100
MAX_RETRIES = 3
TIMEOUT = 30             # Segundos

async def fetch_cats_with_breeds(batch_size: int):
    print(f"Obteniendo {batch_size} gatos con raza...")
    headers = {"x-api-key": API_KEY}
    params = {"limit": batch_size, "has_breeds": 1}

    for attempt in range(MAX_RETRIES):
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT) as client:
                response = await client.get(
                    "https://api.thecatapi.com/v1/images/search",
                    params=params,
                    headers=headers
                )
                if response.status_code == 200:
                    data = response.json()
                    print(f"  → {len(data)} gatos recibidos")
                    return data
                else:
                    print(f"  → Error {response.status_code}: {response.text}")
        except httpx.ReadTimeout:
            print(f"  → Timeout (intento {attempt + 1}/{MAX_RETRIES})")
        except Exception as e:
            print(f"  → Error inesperado: {e}")
        
        if attempt < MAX_RETRIES - 1:
            await asyncio.sleep(2 ** attempt)  # Backoff exponencial

    raise Exception("No se pudo obtener datos después de varios intentos")

async def main():
    print(f"Buscando {TARGET_COUNT} gatos con raza...")
    collected = 0

    with engine.connect() as conn:
        while collected < TARGET_COUNT:
            remaining = TARGET_COUNT - collected
            current_batch = min(BATCH_SIZE, remaining)
            
            raw_cats = await fetch_cats_with_breeds(current_batch)
            
            for cat in raw_cats:
                if collected >= TARGET_COUNT:
                    break
                if cat.get("breeds"):
                    breed = cat["breeds"][0]
                    cat_data = {
                        "id": cat["id"],
                        "image_url": cat["url"],
                        "breed_name": breed.get("name"),
                        "origin": breed.get("origin"),
                        "temperament": breed.get("temperament")
                    }
                    conn.execute(text("""
                        INSERT INTO cats (id, image_url, breed_name, origin, temperament)
                        VALUES (:id, :image_url, :breed_name, :origin, :temperament)
                        ON CONFLICT (id) DO NOTHING
                    """), cat_data)
                    collected += 1
                    print(f"  → Gato {collected}/50 guardado: {breed.get('name')}")

        conn.commit()

    print(f"\nÉXITO: {collected} gatos con raza guardados en PostgreSQL.")

if __name__ == "__main__":
    asyncio.run(main())