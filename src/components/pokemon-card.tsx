import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { type Pokemon, getTypeColor } from "~/lib/pokemon-data"
import Link from "next/link"

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Pokemon Image */}
            <div className="relative w-24 h-24 bg-muted rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={`/abstract-geometric-shapes.png?height=96&width=96&query=${pokemon.name} pokemon sprite`}
                alt={pokemon.name}
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Pokemon Info */}
            <div className="text-center space-y-2 w-full">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">#{pokemon.id.toString().padStart(3, "0")}</span>
                <span className="text-sm text-muted-foreground">Gen {pokemon.generation}</span>
              </div>

              <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
                {pokemon.name}
              </h3>

              {/* Types */}
              <div className="flex gap-1 justify-center flex-wrap">
                {pokemon.types.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className={`${getTypeColor(type)} text-white text-xs px-2 py-1`}
                  >
                    {type}
                  </Badge>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-3">
                <div>Height: {(pokemon.height / 10).toFixed(1)}m</div>
                <div>Weight: {(pokemon.weight / 10).toFixed(1)}kg</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
