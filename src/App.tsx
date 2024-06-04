import { useFetchPokemons } from '@/hooks/useFetchPokemons'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { PokeCard } from '@components/PokeCard'
import { SkeletonPokeCard } from '@components/SkeletonPokeCard'
import { Button } from '@components/ui/button'
import { useEffect, useState } from 'react'

export function App() {
  const { pokemons, isFetching, addMorePokemons } = useFetchPokemons(34)
  const [searchTerm, setSearchTerm] = useState('')
  const [autoFetch, setAutoFetch] = useState(true)

  const filteredPokemons = pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  })

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

  return (
    <>
      <Header
        searchTermState={searchTerm}
        handleSearch={(e) => setSearchTerm(e.target.value)}
        handleSwitch={(checked) => setAutoFetch(checked)}
      />

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

      <Footer />
    </>
  )
}
