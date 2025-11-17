// assets/js/pages/thecatpage.js

let allCats = []; // Guardar todos los gatos

async function cargarListaGatos() {
  const container = document.getElementById('gatos-list');
  container.innerHTML = '<p>Cargando gatos...</p>';

  try {
    // Cargar todos los gatos si no están
    if (allCats.length === 0) {
      const response = await fetch('http://localhost:8000/cats');
      if (!response.ok) throw new Error('Error al cargar gatos');
      allCats = await response.json();
    }

    // Mezclar y tomar 10
    const shuffled = [...allCats].sort(() => 0.5 - Math.random());
    const seleccionados = shuffled.slice(0, 10);

    container.innerHTML = '';

    seleccionados.forEach((gato) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.style.cursor = 'pointer';
      card.tabIndex = 0;

      card.innerHTML = `
  <div class="card-content">
    <h3>Gato</h3>
    <figure>
      <img src="${gato.image_url}" 
           alt="${gato.breed_name || 'Gato'}" 
           loading="lazy"
           style="width: 140px; height: 140px;"> <!-- Tamaño controlado -->
      <figcaption>Raza: ${gato.breed_name || 'Desconocida'}</figcaption>
    </figure>
  </div>
`;

      // Click en toda la carta
      card.addEventListener('click', () => {
        localStorage.setItem('gatoSeleccionadoId', gato.id);
        window.location.href = 'gatosdetalle.html';
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          localStorage.setItem('gatoSeleccionadoId', gato.id);
          window.location.href = 'gatosdetalle.html';
        }
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = '<p>Error al cargar los gatos</p>';
  }
}

// REFRESCAR → RANDOMIZAR
document.getElementById('btn-refrescar')?.addEventListener('click', () => {
  cargarListaGatos(); // Vuelve a mezclar
});

// Cargar al inicio
document.addEventListener('DOMContentLoaded', cargarListaGatos);