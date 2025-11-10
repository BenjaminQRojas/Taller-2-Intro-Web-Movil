export async function getPokemonFromPokeAPI(nameOrId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Pokémon no encontrado en la PokeAPI');

  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    type: data.types.map(t => t.type.name).join(', '),
    image: data.sprites.front_default
  };
}
