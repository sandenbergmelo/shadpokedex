import type { PokeAPI } from 'pokeapi-types'

export interface Pokemon extends PokeAPI.Pokemon {
  sprites: PokeAPI.PokemonSprites & {
    versions?: {
      'generation-v'?: {
        'black-white'?: {
          front_default?: string
          animated?: {
            front_default: string
          }
        }
      }
    }
  },
  cries: {
    latest?: string
    legacy: string
  }
}
