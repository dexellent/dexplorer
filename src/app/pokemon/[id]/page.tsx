import { getTypeColor } from "~/lib/pokemon-data";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { ArrowLeft, Ruler, Weight, Zap } from "lucide-react";
import { ThemeSwitcher } from "~/components/theme-switcher";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Pokemon, type PokemonSpecies } from "~/lib/pokeapi";
import {
  fetchPokemonById,
  fetchPokemonSpeciesById,
} from "~/lib/pokeapi/actions";
import { getGenerationNumber } from "~/lib/utils";

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const id = Number.parseInt(params.id);
  const pokemon: Pokemon = await fetchPokemonById(id);
  const pokemonSpecies: PokemonSpecies = await fetchPokemonSpeciesById(id);

  if (!pokemon) {
    notFound();
  }

  const maxStat = 255; // Maximum possible stat value for progress bars

  // Helper function to get stat value by name
  const getStatValue = (statName: string): number => {
    const stat = pokemon.stats.find((s) => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  // Get English flavor text
  const getEnglishFlavorText = (): string => {
    const englishEntry = pokemonSpecies.flavor_text_entries.find(
      (entry) => entry.language.name === "en",
    );
    return englishEntry
      ? englishEntry.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ")
      : "No description available.";
  };

  // Calculate total stats
  const totalStats = pokemon.stats.reduce(
    (sum, stat) => sum + stat.base_stat,
    0,
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-card border-border border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Pokédex
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  #{pokemon.id.toString().padStart(3, "0")}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  Generation {getGenerationNumber(pokemonSpecies)}
                </span>
              </div>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-6">
            {/* Pokemon Image */}
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-muted flex h-48 w-48 items-center justify-center overflow-hidden rounded-full">
                    <img
                      src={
                        pokemon.sprites.other["official-artwork"]
                          .front_default ?? pokemon.sprites.front_default
                      }
                      alt={pokemon.name}
                      className="h-40 w-40 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h1 className="text-foreground mb-2 text-3xl font-bold capitalize">
                      {pokemon.name}
                    </h1>
                    <div className="flex justify-center gap-2">
                      {pokemon.types.map((type) => (
                        <Badge
                          key={type.slot}
                          className={`${getTypeColor(type.type.name)} px-3 py-1 text-white capitalize`}
                        >
                          {type.type.name}
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
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                      <Ruler className="text-primary h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Height</p>
                      <p className="font-semibold">
                        {(pokemon.height / 10).toFixed(1)} m
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                      <Weight className="text-primary h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Weight</p>
                      <p className="font-semibold">
                        {(pokemon.weight / 10).toFixed(1)} kg
                      </p>
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
                    <Badge
                      key={ability.slot}
                      variant={ability.is_hidden ? "secondary" : "outline"}
                      className="px-3 py-1 capitalize"
                    >
                      {ability.ability.name.replace("-", " ")}
                      {ability.is_hidden && (
                        <span className="ml-1 text-xs">(Hidden)</span>
                      )}
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
                <p className="text-muted-foreground leading-relaxed">
                  {getEnglishFlavorText()}
                </p>
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
                    <span className="w-24 text-sm font-medium">HP</span>
                    <span className="w-12 text-right font-mono text-sm">
                      {getStatValue("hp")}
                    </span>
                    <Progress
                      value={(getStatValue("hp") / maxStat) * 100}
                      className="mx-3 flex-1"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="w-24 text-sm font-medium">Attack</span>
                    <span className="w-12 text-right font-mono text-sm">
                      {getStatValue("attack")}
                    </span>
                    <Progress
                      value={(getStatValue("attack") / maxStat) * 100}
                      className="mx-3 flex-1"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="w-24 text-sm font-medium">Defense</span>
                    <span className="w-12 text-right font-mono text-sm">
                      {getStatValue("defense")}
                    </span>
                    <Progress
                      value={(getStatValue("defense") / maxStat) * 100}
                      className="mx-3 flex-1"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="w-24 text-sm font-medium">Sp. Attack</span>
                    <span className="w-12 text-right font-mono text-sm">
                      {getStatValue("special-attack")}
                    </span>
                    <Progress
                      value={(getStatValue("special-attack") / maxStat) * 100}
                      className="mx-3 flex-1"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="w-24 text-sm font-medium">
                      Sp. Defense
                    </span>
                    <span className="w-12 text-right font-mono text-sm">
                      {getStatValue("special-defense")}
                    </span>
                    <Progress
                      value={(getStatValue("special-defense") / maxStat) * 100}
                      className="mx-3 flex-1"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="w-24 text-sm font-medium">Speed</span>
                    <span className="w-12 text-right font-mono text-sm">
                      {getStatValue("speed")}
                    </span>
                    <Progress
                      value={(getStatValue("speed") / maxStat) * 100}
                      className="mx-3 flex-1"
                    />
                  </div>
                </div>

                {/* Total Stats */}
                <div className="border-border border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-mono font-semibold">
                      {totalStats}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Species Info */}
            <Card>
              <CardHeader>
                <CardTitle>Species Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Capture Rate
                    </p>
                    <p className="font-semibold">
                      {pokemonSpecies.capture_rate}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Base Happiness
                    </p>
                    <p className="font-semibold">
                      {pokemonSpecies.base_happiness}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Growth Rate</p>
                    <p className="font-semibold capitalize">
                      {pokemonSpecies.growth_rate.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Egg Groups</p>
                    <div className="flex flex-wrap gap-1">
                      {pokemonSpecies.egg_groups.map((group) => (
                        <Badge
                          key={group.name}
                          variant="outline"
                          className="text-xs capitalize"
                        >
                          {group.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
