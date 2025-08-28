import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { Pokemon, PokemonSpecies } from "~/lib/pokeapi";
import { getTypeColor } from "~/lib/pokemon-data";
import Link from "next/link";
import { getGenerationNumber } from "~/lib/utils";

interface PokemonCardProps {
  pokemonData: {
    pokemon: Pokemon;
    species: PokemonSpecies;
  };
}

export function PokemonCard({ pokemonData }: PokemonCardProps) {
  const { pokemon, species } = pokemonData;
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="group bg-card border-border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Pokemon Image */}
            <div className="bg-muted relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full">
              <img
                src={
                  pokemon.sprites.other["official-artwork"].front_default ??
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="h-20 w-20 object-contain"
              />
            </div>

            {/* Pokemon Info */}
            <div className="w-full space-y-2 text-center">
              <div className="flex w-full items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  #{pokemon.id.toString().padStart(3, "0")}
                </span>
                <span className="text-muted-foreground text-sm">
                  Gen {getGenerationNumber(species)}
                </span>
              </div>

              <h3 className="text-card-foreground group-hover:text-primary text-lg font-semibold transition-colors">
                {pokemon.name}
              </h3>

              {/* Types */}
              <div className="flex flex-wrap justify-center gap-1">
                {pokemon.types.map((type) => (
                  <Badge
                    key={type.slot}
                    variant="secondary"
                    className={`${getTypeColor(type.type.name)} px-2 py-1 text-xs text-white`}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="text-muted-foreground mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>Height: {(pokemon.height / 10).toFixed(1)}m</div>
                <div>Weight: {(pokemon.weight / 10).toFixed(1)}kg</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
