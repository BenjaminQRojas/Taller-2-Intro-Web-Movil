import { fetchData } from './fetch.js';

export async function getStarWarsCharacter(id) {
    const url = `http://localhost:3000/people/${id}`;
    const characterData = await fetchData(url);

    if (characterData) {
        return {
            name: characterData.name,
            height: characterData.height,
            birth_year: characterData.birth_year,
            hair_color: characterData.hair_color,
            skin_color: characterData.skin_color,
            eye_color: characterData.eye_color,
            height: characterData.height,
            mass: characterData.mass,
        };
    }
    return null;
}