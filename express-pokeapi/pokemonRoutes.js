import express from 'express';
import { getAllPokemons, getPokemon } from './pokemon.controller.js';

const router = express.Router();

router.get('/', getAllPokemons);
router.get('/:id', getPokemon);

export default router;
