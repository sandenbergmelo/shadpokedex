import type { Pokemon } from '@/types/pokemon'
import axios from 'axios'

const typeBgColors: Record<string, string> = {
  normal: 'bg-[#A8A77A]',
  fire: 'bg-[#EE8130]',
  water: 'bg-[#6390F0]',
  electric: 'bg-[#F7D02C]',
  grass: 'bg-[#7AC74C]',
  ice: 'bg-[#96D9D6]',
  fighting: 'bg-[#C22E28]',
  poison: 'bg-[#A33EA1]',
  ground: 'bg-[#E2BF65]',
  flying: 'bg-[#A98FF3]',
  psychic: 'bg-[#F95587]',
  bug: 'bg-[#A6B91A]',
  rock: 'bg-[#B6A136]',
  ghost: 'bg-[#735797]',
  dragon: 'bg-[#6F35FC]',
  dark: 'bg-[#705746]',
  steel: 'bg-[#B7B7CE]',
  fairy: 'bg-[#D685AD]',
}

function createPokemonPromises(amount: number, start: number = 1): Promise<Pokemon | null>[] {
  return Array.from({ length: amount }, async (_, i) => {
    const id = i + start
    try {
      const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch Pokemon with ID: ${id}`, error)
      return null
    }
  })
}

export async function getPokemons(amount: number, start: number = 1): Promise<Pokemon[]> {
  try {
    const pokemonPromises = createPokemonPromises(amount, start)
    const pokemons = await Promise.all(pokemonPromises)
    return pokemons.filter(pokemon => pokemon !== null) as Pokemon[]
  } catch (error) {
    console.error('Failed to fetch Pokemons', error)
    return []
  }
}

export function getPokeAnimatedSprite(poke: Pokemon, isShiny: boolean = false): string {
  if (isShiny) {
    const shinyAnimated = poke.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_shiny
    return shinyAnimated || poke.sprites.front_shiny
  }

  const animated = poke.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default
  return animated || poke.sprites.front_default
}

export function getTypeBgColor(typeName: string): string {
  return typeBgColors[typeName] || 'bg-gray-500'
}

export function getPokemonSound(poke: Pokemon): string {
  return poke.cries?.latest || poke.cries.legacy
}
