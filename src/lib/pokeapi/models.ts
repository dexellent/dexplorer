// Types partagés
interface NamedAPIResource {
    name: string;
    url: string;
}

export interface RessourceListAPI {
  count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}

interface Language {
    name: string;
    url: string;
}

interface Version {
    name: string;
    url: string;
}

// Types spécifiques à pokemon-species
export interface PokemonSpecies {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: NamedAPIResource;
    pokedex_numbers: PokedexNumber[];
    egg_groups: NamedAPIResource[];
    color: NamedAPIResource;
    shape: NamedAPIResource;
    evolves_from_species: NamedAPIResource | null;
    evolution_chain: {
        url: string;
    };
    habitat: NamedAPIResource | null;
    generation: NamedAPIResource;
    names: Name[];
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: FormDescription[];
    genera: Genus[];
    varieties: Variety[];
}

interface PokedexNumber {
    entry_number: number;
    pokedex: NamedAPIResource;
}

interface Name {
    name: string;
    language: Language;
}

interface FlavorTextEntry {
    flavor_text: string;
    language: Language;
    version: Version;
}

interface FormDescription {
    description: string;
    language: Language;
}

interface Genus {
    genus: string;
    language: Language;
}

interface Variety {
    is_default: boolean;
    pokemon: NamedAPIResource;
}

// Interface Pokemon mise à jour avec types mutualisés
export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    held_items: HeldItem[];
    location_area_encounters: string;
    moves: Move[];
    species: NamedAPIResource;
    sprites: Sprites;
    cries: Cries;
    stats: Stat[];
    types: Type[];
    past_types: PastType[];
    past_abilities: PastAbility[];
}

interface Ability {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

interface GameIndex {
    game_index: number;
    version: Version;
}

interface HeldItem {
    item: NamedAPIResource;
    version_details: {
        rarity: number;
        version: Version;
    }[];
}

interface Move {
    move: NamedAPIResource;
    version_group_details: {
        level_learned_at: number;
        version_group: NamedAPIResource;
        move_learn_method: NamedAPIResource;
        order: number;
    }[];
}

interface Sprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
        dream_world: SpriteVariant;
        home: SpriteVariant;
        "official-artwork": SpriteVariant;
        showdown: SpriteVariant;
    };
    versions: {
        [generation: string]: {
            [version: string]: SpriteVariant | { animated?: SpriteVariant };
        };
    };
}

interface SpriteVariant {
    back_default?: string | null;
    back_female?: string | null;
    back_shiny?: string | null;
    back_shiny_female?: string | null;
    front_default?: string | null;
    front_female?: string | null;
    front_shiny?: string | null;
    front_shiny_female?: string | null;
    back_gray?: string | null;
    front_gray?: string | null;
}

interface Cries {
    latest: string;
    legacy: string;
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

interface Type {
    slot: number;
    type: NamedAPIResource;
}

interface PastType {
    generation: NamedAPIResource;
    types: Type[];
}

interface PastAbility {
    generation: NamedAPIResource;
    abilities: {
        ability: NamedAPIResource | null;
        is_hidden: boolean;
        slot: number;
    }[];
}