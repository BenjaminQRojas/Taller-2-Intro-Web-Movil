document.addEventListener("DOMContentLoaded", () => {
  const starwarsData = localStorage.getItem("selectedStarWarsCharacter");

  if (!starwarsData) {
    document.querySelector("main").innerHTML = "<p>No se encontró información del personaje de Star Wars.</p>";
    return;
  }

  const character = JSON.parse(starwarsData);

  // Renderizar en la página de detalle
  document.getElementById("detalle-starwars-img").src = "../assets/images/default_starwars_profile_picture.jpg";
  document.getElementById("detalle-starwars-img").alt = `Imagen del personaje de Star Wars ${character.name}`;
  document.getElementById("detalle-starwars-nombre").textContent = character.name;

  const list = document.getElementById("detalle-starwars-caracteristicas");
  list.innerHTML = "";

  const li1 = document.createElement("li");
  
  // Convertir altura de centímetros a metros
  const heightInMeters = character.height && character.height !== "unknown" 
    ? (parseInt(character.height) / 100).toFixed(2) 
    : "Desconocida";
  li1.textContent = heightInMeters === "Desconocida" 
    ? `Altura: ${heightInMeters}` 
    : `Altura: ${heightInMeters} meters`;

  const li2 = document.createElement("li");
  const mass = character.mass && character.mass !== "unknown" 
    ? character.mass 
    : "Desconocida";
  li2.textContent = mass === "Desconocida" 
    ? `Masa: ${mass}` 
    : `Masa: ${mass} kilos`;

  const li3 = document.createElement("li");
  li3.textContent = `Color de pelo: ${character.hair_color || "Desconocido"}`;

  const li4 = document.createElement("li");
  li4.textContent = `Color de piel: ${character.skin_color || "Desconocido"}`;

  const li5 = document.createElement("li");
  li5.textContent = `Color de ojos: ${character.eye_color || "Desconocido"}`;
  
  list.appendChild(li1);
  list.appendChild(li2);
  list.appendChild(li3);
  list.appendChild(li4);
  list.appendChild(li5);
});
