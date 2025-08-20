import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PokemonSpecies } from "~/lib/pokeapi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get generation number from generation name
export const getGenerationNumber = (pokemonSpecies: PokemonSpecies): string => {
  const genName = pokemonSpecies.generation.name;
  const romanNumerals: Record<string, string> = {
    "generation-i": "I",
    "generation-ii": "II",
    "generation-iii": "III",
    "generation-iv": "IV",
    "generation-v": "V",
    "generation-vi": "VI",
    "generation-vii": "VII",
    "generation-viii": "VIII",
    "generation-ix": "IX",
  };
  return romanNumerals[genName] ?? genName;
};
