const EXPRESS_API_URL = 'http://localhost:4000/api/meals'; 

export async function getMealList() {
    try {
        const response = await fetch(EXPRESS_API_URL);

        if (!response.ok) {
            throw new Error(`Error al obtener lista de recetas: ${response.status}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error en getMealList:', error);
        return [];
    }
}

export async function getMealDetails(id) {
    try {
        
        const response = await fetch(`${EXPRESS_API_URL}/${id}`);

        if (!response.ok) {
            
            if (response.status === 404) {
                 throw new Error('Receta no encontrada por ID.');
            }
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error en getMealDetails:', error);
        throw error;
    }
}

export async function getRandomMeal() {
    try {
        const response = await fetch(`${EXPRESS_API_URL}/random`);

        if (!response.ok) {
            throw new Error(`Error al obtener receta al azar: ${response.status}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error en getRandomMeal:', error);
        throw error;
    }
}
