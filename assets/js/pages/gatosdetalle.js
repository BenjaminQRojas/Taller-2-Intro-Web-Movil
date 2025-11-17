// assets/js/pages/gatosdetalle.js

async function cargarDetalleGato() {
  const gatoId = localStorage.getItem('gatoSeleccionadoId');
  if (!gatoId) {
    document.body.innerHTML = '<p>No se seleccionó ningún gato.</p>';
    return;
  }

  const img = document.getElementById('detalle-gato-img');
  const nombre = document.getElementById('detalle-gato-nombre');
  const lista = document.getElementById('detalle-gato-caracteristicas');

  try {
    const response = await fetch(`http://localhost:8000/cats/${gatoId}`);
    if (!response.ok) throw new Error('Gato no encontrado');

    const gato = await response.json();

    img.src = gato.image_url;
    img.alt = gato.breed_name || 'Gato';
    nombre.textContent = gato.breed_name || 'Gato sin raza';

    lista.innerHTML = `
      <li><strong>Raza:</strong> ${gato.breed_name || 'Desconocida'}</li>
      <li><strong>Origen:</strong> ${gato.origin || 'Desconocido'}</li>
      <li><strong>Temperamento:</strong> ${gato.temperament || 'No disponible'}</li>
    `;
  } catch (error) {
    console.error('Error:', error);
    nombre.textContent = 'Error al cargar detalle';
    lista.innerHTML = '<li>No se pudo cargar la información</li>';
  }
}

document.addEventListener('DOMContentLoaded', cargarDetalleGato);