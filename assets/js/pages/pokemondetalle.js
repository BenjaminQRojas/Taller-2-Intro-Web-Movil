import { capitalizeFirstLetter } from "../api/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    const pokemonData = localStorage.getItem("selectedPokemon");

    if (!pokemonData) {
      document.querySelector("main").innerHTML = "<p>No se encontró información del Pokémon.</p>";
      return;
    }

    const pokemon = JSON.parse(pokemonData);
    console.log('Datos del Pokémon cargados:', pokemon);

    // Renderizar en la página de detalle
    document.getElementById("detalle-pokemon-img").src = pokemon.image || "https://placehold.co/200x200/e2e8f0/94a3b8?text=Pokemon";
    document.getElementById("detalle-pokemon-img").alt = `Imagen de ${pokemon.name}`;
    const capitalizedName = capitalizeFirstLetter(pokemon.name);
    document.getElementById("detalle-pokemon-nombre").textContent = capitalizedName;

    const list = document.getElementById("detalle-pokemon-caracteristicas");
    list.innerHTML = "";

    const li1 = document.createElement("li");
    li1.textContent = `ID: ${pokemon.id || "Desconocido"}`;

    const li2 = document.createElement("li");
    // Convertir altura de decímetros a metros
    const heightInMeters = pokemon.height ? (pokemon.height / 10).toFixed(1) : "Desconocida";
    li2.textContent = `Altura: ${heightInMeters} metros`;

    const li3 = document.createElement("li");
    li3.textContent = `Tipos: ${pokemon.types && pokemon.types.length > 0 ? pokemon.types.map(type => capitalizeFirstLetter(type)).join(", ") : "Desconocidos"}`;

    const li4 = document.createElement("li");
    li4.textContent = `Habilidades: ${pokemon.abilities && pokemon.abilities.length > 0 ? pokemon.abilities.map(ability => capitalizeFirstLetter(ability)).join(", ") : "Desconocidas"}`;

    list.appendChild(li1);
    list.appendChild(li2);
    list.appendChild(li3);
    list.appendChild(li4);

  } catch (error) {
    console.error('Error cargando detalles del Pokémon:', error);
    document.querySelector("main").innerHTML = "<p>Error al cargar la información del Pokémon.</p>";
  }
});
