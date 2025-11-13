export async function getPokemonFromPokeAPI(nameOrId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Pokémon no encontrado en la PokeAPI');

  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    abilities: data.abilities.map(a => a.ability.name),
    height: data.height,
  };
}
