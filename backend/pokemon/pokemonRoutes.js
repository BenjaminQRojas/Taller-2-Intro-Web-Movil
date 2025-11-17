import express from 'express';
import { getAllPokemons, getPokemon } from './pokemon.controller.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Pokemons
 *     description: Endpoints para manejar Pokémons
 */

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Obtiene la lista completa de Pokémons.
 *     description: Retorna un array con todos los Pokémons disponibles.
 *     tags:
 *       - Pokemons
 *     responses:
 *       200:
 *         description: Lista de Pokémons recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del Pokémon.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nombre del Pokémon.
 *                     example: Bulbasaur
 *                   image:
 *                     type: string
 *                     description: URL de la imagen del Pokémon.
 *                     example: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
 *                   types:
 *                     type: array
 *                     description: Tipos del Pokémon.
 *                     items:
 *                       type: string
 *                     example: ["grass", "poison"]
 *                   abilities:
 *                     type: array
 *                     description: Habilidades del Pokémon.
 *                     items:
 *                       type: string
 *                     example: ["overgrow", "chlorophyll"]
 *                   height:
 *                     type: integer
 *                     description: Altura del Pokémon.
 *                     example: 7
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', getAllPokemons);

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Obtiene un Pokémon por su ID.
 *     description: Retorna los detalles de un Pokémon específico.
 *     tags:
 *       - Pokemons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del Pokémon.
 *         example: 4
 *     responses:
 *       200:
 *         description: Detalles del Pokémon recuperados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 4
 *                 name:
 *                   type: string
 *                   example: Charmander
 *                 image:
 *                   type: string
 *                   example: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
 *                 types:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["fire"]
 *                 abilities:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["blaze"]
 *                 height:
 *                   type: integer
 *                   example: 6
 *       404:
 *         description: Pokémon no encontrado con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', getPokemon);

export default router;