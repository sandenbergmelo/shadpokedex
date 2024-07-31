import type { Pokemon } from '@/types/pokemon'
import { api } from './api-client'

const pokeTypeBgClassName: Record<string, string> = {
  normal: 'bg-pokeType-normal',
  fire: 'bg-pokeType-fire',
  water: 'bg-pokeType-water',
  electric: 'bg-pokeType-electric',
  grass: 'bg-pokeType-grass',
  ice: 'bg-pokeType-ice',
  fighting: 'bg-pokeType-fighting',
  poison: 'bg-pokeType-poison',
  ground: 'bg-pokeType-ground',
  flying: 'bg-pokeType-flying',
  psychic: 'bg-pokeType-psychic',
  bug: 'bg-pokeType-bug',
  rock: 'bg-pokeType-rock',
  ghost: 'bg-pokeType-ghost',
  dragon: 'bg-pokeType-dragon',
  dark: 'bg-pokeType-dark',
  steel: 'bg-pokeType-steel',
  fairy: 'bg-pokeType-fairy',
}

function createPokemonPromises(
  amount: number,
  start: number = 1,
): Promise<Pokemon | null>[] {
  return Array.from({ length: amount }, async (_, i) => {
    const id = i + start
    try {
      const response = await api.get<Pokemon>(`/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch Pokemon with ID: ${id}`, error)
      return null
    }
  })
}

export async function getPokemons(
  amount: number,
  start: number = 1,
): Promise<Pokemon[]> {
  try {
    const pokemonPromises = createPokemonPromises(amount, start)
    const pokemons = await Promise.all(pokemonPromises)
    return pokemons.filter((pokemon) => pokemon !== null) as Pokemon[]
  } catch (error) {
    console.error('Failed to fetch Pokemons', error)
    return []
  }
}

export function getPokeAnimatedSprite(
  poke: Pokemon,
  isShiny: boolean = false,
): string {
  if (isShiny) {
    const shinyAnimated =
      poke.sprites.versions?.['generation-v']?.['black-white']?.animated
        ?.front_shiny
    return shinyAnimated || poke.sprites.front_shiny
  }

  const animated =
    poke.sprites.versions?.['generation-v']?.['black-white']?.animated
      ?.front_default
  return animated || poke.sprites.front_default
}

export function getPokeTypeBgClassName(typeName: string): string {
  return pokeTypeBgClassName[typeName] || 'bg-gray-500'
}

export function getPokemonSound(poke: Pokemon): string {
  return poke.cries?.latest || poke.cries.legacy
}
