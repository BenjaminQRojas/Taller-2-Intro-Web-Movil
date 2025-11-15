CREATE TABLE IF NOT EXISTS cats (
    id TEXT PRIMARY KEY,
    image_url TEXT NOT NULL,
    breed_name TEXT,
    origin TEXT,
    temperament TEXT
);