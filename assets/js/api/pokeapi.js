import { fetchData } from './fetch.js';

export async function getPokemon(nameOrId) {
  const url = `http://localhost:4000/api/pokemons/${nameOrId.toLowerCase()}`;
  const pokemonData = await fetchData(url);

  if (pokemonData) {
    return {
      name: pokemonData.name,
      id: pokemonData.id,
      image: pokemonData.image,                 
      types: pokemonData.types || [],           
      abilities: pokemonData.abilities || [],   
      height: pokemonData.height || 0           
    };
  }

  return null;
}
