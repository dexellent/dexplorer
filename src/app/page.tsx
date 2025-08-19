"use client"

import { useState, useMemo } from "react"
import { mockPokemon } from "~/lib/pokemon-data"
import { PokemonCard } from "~/components/pokemon-card"
import { PokemonSearch } from "~/components/pokemon-search"
import { ThemeSwitcher } from "~/components/theme-switcher"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Filter Pokemon based on search and type filters
  const filteredPokemon = useMemo(() => {
    return mockPokemon.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedTypes.length === 0 || selectedTypes.some((type) => pokemon.types.includes(type))

      return matchesSearch && matchesType
    })
  }, [searchTerm, selectedTypes])

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleClearFilters = () => {
    setSelectedTypes([])
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <ThemeSwitcher />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Pokédex</h1>
            <p className="text-muted-foreground">Discover and explore the world of Pokémon</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No Pokémon found matching your criteria</p>
            <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}
