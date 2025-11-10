import Pokemon from './pokemon.model.js';
import { getPokemonFromPokeAPI } from './pokeapi.service.js';

//obtener todos los pokemon desde la base local
export async function getAllPokemons(req, res) {
  try {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// buscar pokemon por ID o nombre
export async function getPokemon(req, res) {
  const { id } = req.params;
  try {
    // buscar primero en la BD local
    let pokemon = await Pokemon.findByPk(id);

    //obtenerlo de la PokeAPI
    if (!pokemon) {
      const newPokemon = await getPokemonFromPokeAPI(id);
      pokemon = await Pokemon.create(newPokemon);
    }

    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
