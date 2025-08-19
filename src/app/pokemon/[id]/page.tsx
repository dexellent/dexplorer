import { mockPokemon, getTypeColor } from "~/lib/pokemon-data"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Progress } from "~/components/ui/progress"
import { ArrowLeft, Ruler, Weight, Zap } from "lucide-react"
import { ThemeSwitcher } from "~/components/theme-switcher"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PokemonDetailPageProps {
  params: {
    id: string
  }
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const pokemon = mockPokemon.find((p) => p.id === Number.parseInt(params.id))

  if (!pokemon) {
    notFound()
  }

  const maxStat = 255 // Maximum possible stat value for progress bars

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Pokédex
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">#{pokemon.id.toString().padStart(3, "0")}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Generation {pokemon.generation}</span>
              </div>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-6">
            {/* Pokemon Image */}
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-48 h-48 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={`/abstract-geometric-shapes.png?height=192&width=192&query=${pokemon.name} pokemon official artwork`}
                      alt={pokemon.name}
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{pokemon.name}</h1>
                    <div className="flex gap-2 justify-center">
                      {pokemon.types.map((type) => (
                        <Badge key={type} className={`${getTypeColor(type)} text-white px-3 py-1`}>
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Physical Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Physical Attributes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Ruler className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-semibold">{(pokemon.height / 10).toFixed(1)} m</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Weight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Abilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <Badge key={ability} variant="outline" className="px-3 py-1">
                      {ability}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats and Description */}
          <div className="space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{pokemon.description}</p>
              </CardContent>
            </Card>

            {/* Base Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Base Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-24">HP</span>
                    <span className="text-sm font-mono w-12 text-right">{pokemon.stats.hp}</span>
                    <Progress value={(pokemon.stats.hp / maxStat) * 100} className="flex-1 mx-3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-24">Attack</span>
                    <span className="text-sm font-mono w-12 text-right">{pokemon.stats.attack}</span>
                    <Progress value={(pokemon.stats.attack / maxStat) * 100} className="flex-1 mx-3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-24">Defense</span>
                    <span className="text-sm font-mono w-12 text-right">{pokemon.stats.defense}</span>
                    <Progress value={(pokemon.stats.defense / maxStat) * 100} className="flex-1 mx-3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-24">Sp. Attack</span>
                    <span className="text-sm font-mono w-12 text-right">{pokemon.stats.specialAttack}</span>
                    <Progress value={(pokemon.stats.specialAttack / maxStat) * 100} className="flex-1 mx-3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-24">Sp. Defense</span>
                    <span className="text-sm font-mono w-12 text-right">{pokemon.stats.specialDefense}</span>
                    <Progress value={(pokemon.stats.specialDefense / maxStat) * 100} className="flex-1 mx-3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-24">Speed</span>
                    <span className="text-sm font-mono w-12 text-right">{pokemon.stats.speed}</span>
                    <Progress value={(pokemon.stats.speed / maxStat) * 100} className="flex-1 mx-3" />
                  </div>
                </div>

                {/* Total Stats */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold font-mono">
                      {Object.values(pokemon.stats).reduce((sum, stat) => sum + stat, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evolution Chain */}
            {pokemon.evolutionChain && (
              <Card>
                <CardHeader>
                  <CardTitle>Evolution Chain</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    {pokemon.evolutionChain.map((evolution, index) => (
                      <div key={evolution} className="flex items-center gap-2">
                        <Badge variant={evolution === pokemon.name ? "default" : "outline"} className="px-3 py-1">
                          {evolution}
                        </Badge>
                        {index < pokemon.evolutionChain!.length - 1 && <span className="text-muted-foreground">→</span>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
