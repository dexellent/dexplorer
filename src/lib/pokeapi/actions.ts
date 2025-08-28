"use server";

import type { Pokemon, PokemonSpecies, RessourceListAPI } from "./models";

export async function fetchPokemonById(id: number | string): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return (await response.json()) as Pokemon;
}

export async function fetchPokemonSpeciesById(
    id: number | string,
): Promise<PokemonSpecies> {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    return (await response.json()) as PokemonSpecies;
}

export async function fetchPokemonList(): Promise<RessourceListAPI> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  return (await response.json()) as RessourceListAPI;
}