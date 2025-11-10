# seed/seed_cats.py
import httpx
import asyncio
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

async def fetch_cats():
    print("Descargando 50 gatos de TheCatAPI...")
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.thecatapi.com/v1/images/search",
            params={"limit": 50, "has_breeds": 1}
        )
        return response.json()

def insert_cats(cats):
    with engine.connect() as conn:
        for cat in cats:
            breed = cat.get("breeds", [{}])[0]
            conn.execute(text("""
                INSERT INTO cats (id, image_url, breed_name, origin, temperament)
                VALUES (:id, :image_url, :breed_name, :origin, :temperament)
                ON CONFLICT (id) DO NOTHING
            """), {
                "id": cat["id"],
                "image_url": cat["url"],
                "breed_name": breed.get("name"),
                "origin": breed.get("origin"),
                "temperament": breed.get("temperament")
            })
        conn.commit()
    print("50 gatos insertados en PostgreSQL")

async def main():
    cats = await fetch_cats()
    insert_cats(cats)

if __name__ == "__main__":
    asyncio.run(main())