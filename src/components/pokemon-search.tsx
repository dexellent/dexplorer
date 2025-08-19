"use client"

import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Search, Filter } from "lucide-react"
import { useState } from "react"

interface PokemonSearchProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedTypes: string[]
  onTypeToggle: (type: string) => void
  onClearFilters: () => void
}

const pokemonTypes = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
]

export function PokemonSearch({
  searchTerm,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
  onClearFilters,
}: PokemonSearchProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search Pokemon by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background border-border"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filter by Type
        </Button>

        {selectedTypes.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Type Filters */}
      {showFilters && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {pokemonTypes.map((type) => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? "default" : "outline"}
              className="cursor-pointer text-center justify-center py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onTypeToggle(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      )}

      {/* Active Filters Display */}
      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="cursor-pointer" onClick={() => onTypeToggle(type)}>
              {type} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
