"use server";

import type { Pokemon, PokemonSpecies } from "./models";

export async function fetchPokemonById(id: number): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return (await response.json()) as Pokemon;
}

export async function fetchPokemonSpeciesById(
    id: number,
): Promise<PokemonSpecies> {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    return (await response.json()) as PokemonSpecies;
}
