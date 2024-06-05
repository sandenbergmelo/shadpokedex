import { useFetchPokemons } from '@/hooks/useFetchPokemons'
import { useEffect } from 'react'
import { PokeCard } from '@components/PokeCard'
import { SkeletonPokeCard } from '@components/SkeletonPokeCard'
import { Button } from '@components/ui/button'

interface PokeListProps {
  autoFetch: boolean
  searchTerm: string
}

export function PokeList({ autoFetch, searchTerm }: PokeListProps) {
  const { pokemons, isFetching, addMorePokemons } = useFetchPokemons(34)

  useEffect(() => {
    if (!autoFetch || searchTerm.trim()) return

    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        addMorePokemons(25)
      }
    })

    intersectionObserver.observe(document.querySelector('footer') as Element)

    return () => intersectionObserver.disconnect()
  }, [addMorePokemons, autoFetch, searchTerm])

  const filteredPokemons = pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  })

  return (
    <main className='container flex flex-wrap justify-center gap-4'>
      {isFetching && pokemons.length === 0 ?
        Array.from({ length: 34 }).map((_, index) => (
          <SkeletonPokeCard key={index} />
        ))
        :
        filteredPokemons.map(pokemon => (
          <PokeCard key={pokemon.id} pokemon={pokemon} />
        ))
      }

      {isFetching && Array.from({ length: 15 }).map((_, index) => (
        <SkeletonPokeCard key={index} />
      ))}

      {!autoFetch && !searchTerm &&
        <Button variant='secondary' onClick={() => addMorePokemons(15)}>
          Carregar mais
        </Button>
      }
    </main>
  )
}
