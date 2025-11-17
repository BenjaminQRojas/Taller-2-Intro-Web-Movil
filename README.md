# Taller Nº 2 – Introducción a Web Móvil  
**InfoMóvil – Universidad Católica del Norte**  
Docentes: Valentina Henríquez – Cristhian Rabi  
Entrega: 17 de noviembre de 2025  

## Integrantes del equipo  
| Nombre                       | RUT             | API responsable         | Tecnología            |
|------------------------------|-----------------|-------------------------|-----------------------|
| Nicolás Ignacio Peralta      | 21.004.634-8    | TheCatAPI               | FastAPI + Python      |
| Mauricio Díaz González       | 21.227.728-2    | PokeAPI                 | Express + Node.js     |
| Benjamín Quiroz Rojas        | 19.956.115-4    | TheMealDB               | Express + Node.js     |
| Vicente Díaz Pastene         | 21.487.788-0    | SWAPI                   | NestJS + TypeScript   |

## Historia del Proyecto  
La empresa InfoMóvil ha decidido avanzar hacia una arquitectura más completa, incorporando servicios backend desarrollados por el propio equipo de ingeniería.  
El objetivo de este segundo taller es que los equipos diseñen y desarrollen un ecosistema compuesto por múltiples APIs y una aplicación web móvil empaquetada como **APK Android mediante Apache Cordova**.

## Tecnologías utilizadas  
- Backend: **FastAPI (Python)**, **NestJS (TypeScript)**, **Express (Node.js)**  
- Base de datos: **PostgreSQL** (una DB por API)  
- Frontend: HTML5 + CSS3 + JavaScript vanilla (100% responsive, Mobile First)  
- Empaquetado móvil: **Apache Cordova**  
- Documentación APIs: **Swagger UI**  

## Cómo ejecutar las APIs localmente  

## 0. Setup automático de bases de datos (1 clic)

¡No necesitas crear las 4 bases de datos a mano!

```bash
# Una sola vez (crea las 4 DB y sincroniza los datos)
bash setup-databases.sh
```
*En caso de que falle, sólo hay que crear 4 databases llamadas swapi, infomovil, themealdb y pokeapi*
### 1. Gatos – FastAPI (puerto 8000)  
```
cd backend/cats
uvicorn app.main:app --reload --port 8000
Swagger: http://localhost:8000/docs
```

### 2. StarWars - NestJS (puerto 3000)
```
cd backend/starwars
npm install
npm run start
```
Swagger: http://localhost:3000/docs
Sync inicial (una sola vez): POST http://localhost:3000/people/sync

### 3. Recetas - Express (puerto 5000)
```
cd backend/meals
npm install
npm run dev
```

### 4. Pókemon - Express (puerto 4000)
```
cd backend/pokemon
npm install
npm run dev
```

## URLs para el emulador Android o dispositivo físico
```
Gatos     → http://10.0.2.2:8000
Star Wars → http://10.0.2.2:3000
Recetas   → http://10.0.2.2:5000
Pokémon   → http://10.0.2.2:4000
```

## Generar el APK usando Cordova
```
cd frontend/cordova
cordova platform add android   # solo la primera vez
cordova build android --debug
```
*→ APK final en APK/infomovil.apk (ya incluido)*



