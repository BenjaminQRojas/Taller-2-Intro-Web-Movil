# Taller 2 Intro Web Movil

## INTEGRANTES
    Nicolás Ignacio Peralta | 21.004.634-8
    Mauricio Díaz González | 21.227.728-2
    Benjamín Quiroz Rojas | 19.956.115-4
    Vicente Diaz Pastene | 21.487.788-0

# Historia del Proyecto

La empresa InfoM´ovil ha decidido avanzar hacia una arquitectura m´as completa,
incorporando servicios backend desarrollados por el propio equipo de ingenier´ıa.
El objetivo de este nuevo taller es que los equipos dise˜nen y desarrollen un ecosiste-
ma compuesto por m´ultiples APIs y una aplicaci´on web m´ovil empaquetada como APK
Android mediante Apache Cordova.

Usted deber´a desarrollar tres servicios API que provean informaci´on din´amica desde
bases de datos, y un frontend m´ovil que consuma dichas APIs. Las APIs deben devolver
lo mismo que las APIs que escogi´o para el Taller 1.
La aplicaci´on debe permitir a los usuarios lo mismo que hac´ıa su frontend anterior, con
la opci´on de ser mejorado. Adem´as, se debe instalar como APK en dispositivos Android.
Por lo tanto, puede reutilizar c´odigo sin problema o conservar el c´odigo del frontend del
Taller 1.

# Criterios T´ecnicos y Requerimientos
## 1. Backend — Desarrollo de APIs y DB
Implementar tres APIs independientes:

    API desarrollada en NestJS (Node.js + TypeScript)

    API desarrollada en Express (Node.js)

    API desarrollada en Python (FastAPI)

Cada API debe consultar una base de datos de libre elecci´on (por ejemplo: MySQL,
PostgreSQL, MongoDB, SQLite, etc.). Puede usar varias si lo desea y con su debida jus-
tificaci´on.

Las tres APIs deben funcionar de manera independiente y estar documentadas (por
ejemplo, con Swagger o README descriptivo).

## 2. Frontend
Consumir las tres APIs desarrolladas.

Mantener un dise˜no responsivo y Mobile First.

La l´ogica de interacci´on debe implementarse en JavaScript puro.

Empaquetar la aplicaci´on en formato APK Android utilizando Apache Cordova.

El APK debe ejecutarse correctamente en un dispositivo m´ovil real o emulado.

## 3. Diseño y Usabilidad

Mantener coherencia visual
Implementar dise˜no Mobile First con Tailwind CSS

Mostrar estados de carga y mensajes de error

## 4. Entrega y Organización

El proyecto debe desarrollarse en equipos de 4 integrantes.
Se deber´a entregar:

    Enlace al repositorio GitHub con:
    C´odigo fuente de las tres APIs.
    C´odigo fuente del frontend.
    Instrucciones claras de instalaci´on y ejecuci´on.
    Archivo README.md con:
        N´umero de grupo.
        Nombre, apellido y RUT de cada integrante.
        Tecnolog´ıas y bases de datos utilizadas.
        El archivo APK final generado mediante Cordova.
        
## Roles por Integrante

Nicolás FastAPI(TheCatAPI) + PostgresQL
Vicente NestJs(SWAPI) + PostgresQL
Benja Express(TheMealDBAPI)+ PostgresQL
Mauri Express(PokeAPI) + PostgresQL

API NESTJS
1. Entrar al proyecto e instalar dependencias

cd appi-nest

npm install

4. Crear archivo .env en la raíz del proyecto

DB_HOST=localhost

DB_PORT=5432

DB_USER=postgres

DB_PASS=tu_password

DB_NAME=swapi


Ajusta los valores según tu entorno local.

3. Iniciar el backend

npm run start

## API de Gatos - TheCatAPI (FastAPI + PostgreSQL)
  
**Tecnologías:** Python, FastAPI, PostgreSQL, TheCatAPI (con API Key)

---

### Requisitos previos

- Python 3.11+
- PostgreSQL (local o Docker)
- `pip`, `uvicorn`, `psql`

---

### 1. Configurar variables de entorno
- fastapi-thecatapi/env
DATABASE_URL=postgresql://postgres:password@localhost:5432/infomovil
THECATAPI_KEY=live_tu_api_key_aqui

### 2. Instalar dependencias
cd fastapi-thecatapi
pip install -r requirements.txt

### 3. Base de datos
psql -U postgres -> CREATE DATABASE infomovil;

### 4. Ejecutar seed y levantar API
python seed/seed_cats.py -> uvicorn app.main:app --reload --port 8000

 
