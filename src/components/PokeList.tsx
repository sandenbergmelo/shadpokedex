import { useFetchPokemons } from '@/hooks/useFetchPokemons'
import { PokeCard } from '@components/PokeCard'
import { SkeletonPokeCard } from '@components/SkeletonPokeCard'
import { Button } from '@components/ui/button'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface PokeListProps {
  autoFetch: boolean
  searchTerm: string
  initialAmount?: number
  addAmount?: number
  addAmountAutoFetch?: number
}

export function PokeList({
  autoFetch,
  searchTerm,
  initialAmount = 34,
  addAmount = 15,
  addAmountAutoFetch = 25,
}: PokeListProps) {
  const { pokemons, isFetching, addMorePokemons } =
    useFetchPokemons(initialAmount)

  const { ref, inView } = useInView({ threshold: 0.6 })

  useEffect(() => {
    if (!autoFetch || searchTerm.trim()) return

    ref(document.querySelector('footer')!)

    if (inView) {
      addMorePokemons(addAmountAutoFetch)
    }

    return () => ref(null)
  }, [inView, autoFetch, searchTerm, addAmountAutoFetch, addMorePokemons, ref])

  const filteredPokemons = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  })

  return (
    <main className="container flex flex-wrap justify-center gap-4">
      {isFetching && pokemons.length === 0
        ? Array.from({ length: initialAmount }).map((_, index) => (
            <SkeletonPokeCard key={index} />
          ))
        : filteredPokemons.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))}

      {isFetching &&
        Array.from({ length: addAmount }).map((_, index) => (
          <SkeletonPokeCard key={index} />
        ))}

      {!autoFetch && !searchTerm && (
        <Button variant="secondary" onClick={() => addMorePokemons(addAmount)}>
          Carregar mais
        </Button>
      )}
    </main>
  )
}
