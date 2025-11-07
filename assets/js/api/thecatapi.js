import { fetchData } from './fetch.js';
const API_KEY = 'live_iJc1RbXT1ZcneNHZEUyOJVn1PoYhJ3yQlAVUr7byJnbZWWWYu6YXfaf0HxxG25RA'
export async function getRandomCatImage() {
    const url = "https://api.thecatapi.com/v1/images/search";

    const headers = {
        'x-api-key': API_KEY
    };

    const catData = await fetchData(url, { headers });


    if (catData && catData.length > 0) {
        const cat = catData[0];
        return {
            id: cat.id,
            url: cat.url,
            breed: (cat.breeds.length > 0) ? cat.breeds[0].name : 'Desconocida'
        };
    }
    return null;
}