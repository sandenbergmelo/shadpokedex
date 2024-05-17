import type { PokeAPI } from 'pokeapi-types'

declare interface Pokemon extends PokeAPI.Pokemon {
  sprites: PokeAPI.PokemonSprites & {
    versions?: {
      'generation-v'?: {
        'black-white'?: {
          front_default?: string
          animated?: {
            front_default: string
            back_default: string
            front_shiny: string
            back_shiny: string
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
