export interface Pokemon {
  id: number
  name: string
  types: string[]
  height: number // in decimeters
  weight: number // in hectograms
  abilities: string[]
  stats: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
  description: string
  generation: number
  evolutionChain?: string[]
}

export const mockPokemon: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["Grass", "Poison"],
    height: 7,
    weight: 69,
    abilities: ["Overgrow", "Chlorophyll"],
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
    description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    generation: 1,
    evolutionChain: ["Bulbasaur", "Ivysaur", "Venusaur"],
  },
  {
    id: 4,
    name: "Charmander",
    types: ["Fire"],
    height: 6,
    weight: 85,
    abilities: ["Blaze", "Solar Power"],
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      specialAttack: 60,
      specialDefense: 50,
      speed: 65,
    },
    description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
    generation: 1,
    evolutionChain: ["Charmander", "Charmeleon", "Charizard"],
  },
  {
    id: 7,
    name: "Squirtle",
    types: ["Water"],
    height: 5,
    weight: 90,
    abilities: ["Torrent", "Rain Dish"],
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      specialAttack: 50,
      specialDefense: 64,
      speed: 43,
    },
    description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.",
    generation: 1,
    evolutionChain: ["Squirtle", "Wartortle", "Blastoise"],
  },
  {
    id: 25,
    name: "Pikachu",
    types: ["Electric"],
    height: 4,
    weight: 60,
    abilities: ["Static", "Lightning Rod"],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    },
    description: "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
    generation: 1,
  },
  {
    id: 150,
    name: "Mewtwo",
    types: ["Psychic"],
    height: 20,
    weight: 1220,
    abilities: ["Pressure", "Unnerve"],
    stats: {
      hp: 106,
      attack: 110,
      defense: 90,
      specialAttack: 154,
      specialDefense: 90,
      speed: 130,
    },
    description: "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.",
    generation: 1,
  },
  {
    id: 144,
    name: "Articuno",
    types: ["Ice", "Flying"],
    height: 17,
    weight: 554,
    abilities: ["Pressure", "Snow Cloak"],
    stats: {
      hp: 90,
      attack: 85,
      defense: 100,
      specialAttack: 95,
      specialDefense: 125,
      speed: 85,
    },
    description: "A legendary bird Pokémon that is said to appear to doomed people who are lost in icy mountains.",
    generation: 1,
  },
  {
    id: 448,
    name: "Lucario",
    types: ["Fighting", "Steel"],
    height: 12,
    weight: 540,
    abilities: ["Steadfast", "Inner Focus", "Justified"],
    stats: {
      hp: 70,
      attack: 110,
      defense: 70,
      specialAttack: 115,
      specialDefense: 70,
      speed: 90,
    },
    description: "It has the ability to sense the auras of all things. It understands human speech.",
    generation: 4,
  },
  {
    id: 658,
    name: "Greninja",
    types: ["Water", "Dark"],
    height: 15,
    weight: 400,
    abilities: ["Torrent", "Protean"],
    stats: {
      hp: 72,
      attack: 95,
      defense: 67,
      specialAttack: 103,
      specialDefense: 71,
      speed: 122,
    },
    description:
      "It creates throwing stars out of compressed water. When it spins them and throws them at high speed, these stars can split metal in two.",
    generation: 6,
  },
]

export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    lighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  }
  return typeColors[type.toLowerCase()] ?? "bg-gray-400"
}
