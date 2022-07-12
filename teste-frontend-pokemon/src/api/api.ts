export const searchPokemon = async (pokemon: string) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error: any) {
    console.log(`error: ${error.message}`);
  }
};

export const getPokemonInfo = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error: any) {
    console.log(`error: ${error.message}`);
  }
};

export const getPokemons = async (limit: number = 10, offset: number = 0) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error: any) {
    console.log(`error: ${error.message}`);
  }
};
