# Dexplorer

## TODO

- [x] Deployment to netlify
- [x] Add Pokemon list
- [x] Add Pokemon shee
- [x] Connect to pokeAPI
- [ ] Get pokemon list from pokeApi
- [ ] Configure analytics
- [ ] Add auth (with Clerk)
- [ ] Set up database and datamodel

### Get pokemon list from pokeApi

1. Créer les types pour la réponse de l'endpoint https://pokeapi.co/api/v2/pokemon/ (IA possible)
2. créer une action pour récupérer la liste des pokemons.   
   endpoint : https://pokeapi.co/api/v2/pokemon/ (sans id)  
   docs :  https://pokeapi.co/docs/v2#named
3. Sur la page appeler la nouvelle action
4. Récupérer toutes les infos des pokemons de la page en parcourant la liste en appelant l'action
   `fetchPokemonSpeciesById` et en utilisant le "name" de la liste récupéré avec la première action. Mettre tous les
   pokemons dans l'array "pokemons" existant et utiliser `pokemons` dans .le `useMemo` `filteredPokemon`
5. Comme chaque pokemon est passé au composant PokemonCard, modifie le composant Card pour attendre le type
   PokemonSpecies venant de l'api et modifie les champs affichés dans le html pour correspondre au champ de l'API. (IA
   possible)