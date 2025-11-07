document.addEventListener("DOMContentLoaded", () => {
  const catData = localStorage.getItem("selectedCat");

  if (!catData) {
    document.querySelector("main").innerHTML = "<p>No se encontró información del gato.</p>";
    return;
  }

  const cat = JSON.parse(catData);

  // Renderizar en la página de detalle
  document.getElementById("detalle-gato-img").src = cat.url;
  document.getElementById("detalle-gato-img").alt = `Imagen del gato con ID ${cat.id}`;
  document.getElementById("detalle-gato-nombre").textContent = `ID: ${cat.id}`;

  const list = document.getElementById("detalle-gato-caracteristicas");
  list.innerHTML = "";

  const li1 = document.createElement("li");
  li1.textContent = `Raza: ${cat.breed || "Desconocida"}`;

  const li2 = document.createElement("li");
  li2.textContent = "Un adorable compañero.";

  list.appendChild(li1);
  list.appendChild(li2);
});
