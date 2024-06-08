import { getPokemons } from '@/lib/pokedex'
import type { Pokemon } from '@/types/pokemon'
import { useEffect, useState } from 'react'

export function useFetchPokemons(amount: number, start: number = 1) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    getPokemons(amount, start)
      .then((pokes) => setPokemons(pokes))
      .finally(() => setIsFetching(false))
  }, [amount, start])

  function addMorePokemons(amount: number = 10) {
    if (isFetching) return

    setIsFetching(true)
    getPokemons(amount, pokemons[pokemons.length - 1].id + 1)
      .then((fetchedPokemons) => {
        setPokemons((prevPokemons) => [...prevPokemons, ...fetchedPokemons])
      })
      .finally(() => setIsFetching(false))
  }

  return { pokemons, isFetching, addMorePokemons }
}
