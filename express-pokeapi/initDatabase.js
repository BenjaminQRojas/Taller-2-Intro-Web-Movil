import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

export async function ensureDatabaseExists() {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: 'postgres'
  });

  await client.connect();

  const dbName = process.env.DB_NAME;

  // Verificar si existe la base
  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [dbName]
  );

  if (res.rowCount === 0) {
    console.log(`Base de datos "${dbName}" no existe. Creándola...`);
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Base de datos "${dbName}" creada correctamente.`);
  } else {
    console.log(`✔ Base de datos "${dbName}" ya existe.`);
  }

  await client.end();
}
