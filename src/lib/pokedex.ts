import type { Pokemon } from '@/types/pokemon'
import { api } from './api-client'

const pokeTypeBgClassName: Record<string, string> = {
  normal: 'bg-poke-type-normal',
  fire: 'bg-poke-type-fire',
  water: 'bg-poke-type-water',
  electric: 'bg-poke-type-electric',
  grass: 'bg-poke-type-grass',
  ice: 'bg-poke-type-ice',
  fighting: 'bg-poke-type-fighting',
  poison: 'bg-poke-type-poison',
  ground: 'bg-poke-type-ground',
  flying: 'bg-poke-type-flying',
  psychic: 'bg-poke-type-psychic',
  bug: 'bg-poke-type-bug',
  rock: 'bg-poke-type-rock',
  ghost: 'bg-poke-type-ghost',
  dragon: 'bg-poke-type-dragon',
  dark: 'bg-poke-type-dark',
  steel: 'bg-poke-type-steel',
  fairy: 'bg-poke-type-fairy',
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
