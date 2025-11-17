//funcion para capitalizar la primera letra de una cadena
export function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Función para truncar texto con máximo de caracteres
export function truncateText(texto, largoMax) {
    if (texto.length <= largoMax) {
        return texto;
    }
    return texto.substring(0, largoMax) + '...';
}
