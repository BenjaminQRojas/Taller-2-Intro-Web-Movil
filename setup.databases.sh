#!/bin/bash
# setup-databases.sh
# Ejecutar con: bash setup-databases.sh
# Crea las 4 bases de datos y sincroniza los datos automáticamente

set -e

echo "Creando bases de datos PostgreSQL..."

# Credenciales por defecto (cambiar si usas otra contraseña)
PGUSER="postgres"
PGHOST="localhost"
PGPORT="5432"
# Si tu postgres tiene contraseña, descomenta la línea siguiente y ponla:
# export PGPASSWORD="tu_password_aqui"

# Crear las 4 bases de datos
createdb -h $PGHOST -p $PGPORT -U $PGUSER infomovil 2>/dev/null || echo "infomovil ya existe"
createdb -h $PGHOST -p $PGPORT -U $PGUSER swapi     2>/dev/null || echo "swapi ya existe"
createdb -h $PGHOST -p $PGPORT -U $PGUSER themealdb 2>/dev/null || echo "themealdb ya existe"
createdb -h $PGHOST -p $PGPORT -U $PGUSER pokeapi   2>/dev/null || echo "pokeapi ya existe"

echo "Bases de datos creadas!"

echo "Sincronizando datos..."

# Gatos (FastAPI)
echo "→ Gatos (FastAPI)"
cd backend/cats
python seed/seed_cats.py || echo "Seed gatos falló (puede que ya estén cargados)"
cd ../..

# Star Wars (NestJS)
echo "→ Star Wars (NestJS)"
cd backend/starwars
npm run start &  
NEST_PID=$!
sleep 8
curl -X POST http://localhost:3000/people/sync -s | grep -q "imported" && echo "Star Wars sincronizado" || echo "Fallo sync SW"
kill $NEST_PID 2>/dev/null || true
cd ../..

echo "¡Todo listo! Ahora solo levanta las APIs normalmente."
echo "Ejemplo: uvicorn backend/cats/app.main:app --reload --port 8000"