"use client";

import { useEffect, useMemo, useState } from "react";
import { mockPokemon } from "~/lib/pokemon-data";
import { PokemonCard } from "~/components/pokemon-card";
import { PokemonSearch } from "~/components/pokemon-search";
import { ThemeSwitcher } from "~/components/theme-switcher";
import type { Pokemon, PokemonSpecies } from "~/lib/pokeapi";
import { fetchPokemonById, fetchPokemonList, fetchPokemonSpeciesById } from "~/lib/pokeapi/actions";

interface PokemonPage {
  count: number;
  previous: string|null;
  next: string|null;
  data: {
    pokemon: Pokemon,
    species: PokemonSpecies,
  }[];
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonPage | null>(null);

  useEffect(() => {
    const loadPokemonList = async () => {

      const response = await fetchPokemonList();

      const pokemonPage: PokemonPage = {
        count: response.count,
        previous: response.previous,
        next: response.next,
        data: []
      };

      //parcourir les pokemon dans la réponse.
      // Pour chaque pokemon fetch ses data et les push dans l'array pokemonPage.data
      for (const ressource of response.results){
        const pokemonSpecies = await fetchPokemonSpeciesById(ressource.name);
        const pokemon = await fetchPokemonById(ressource.name);
        pokemonPage.data.push({
          pokemon,
          species: pokemonSpecies,
        });
      }
      // Stocker le resultat avec setPokemonList
      setPokemonList(pokemonPage);
      console.log(pokemonPage);
    };

    void loadPokemonList();
  }, []);

  // Filter Pokemon based on search and type filters
  const filteredPokemon = useMemo(() => {
    if (!pokemonList?.data) return [];

    return pokemonList.data.filter((pokemonData) => {
      const matchesSearch = pokemonData.pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.some((type) => pokemonData.pokemon.types.some(pokemonType =>  pokemonType.type.name === type.toLowerCase()));

      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, selectedTypes]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSearchTerm("");
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-card border-border sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1" />
            <ThemeSwitcher />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-foreground text-4xl font-bold">Pokédex</h1>
            <p className="text-muted-foreground">
              Discover and explore the world of Pokémon
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <PokemonSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPokemon.length} of {mockPokemon.length} Pokémon
          </p>
        </div>

        {/* Pokemon Grid */}
        {filteredPokemon.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.pokemon.id} pokemonData={pokemon} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              No Pokémon found matching your criteria
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
