import { useFetchPokemons } from '@/hooks/useFetchPokemons'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { LoadingPage } from '@components/LoadingPage'
import { PokeCard } from '@components/PokeCard'
import { Button } from '@components/ui/button'
import { RotateCw } from 'lucide-react'
import { useState } from 'react'

export function App() {
  const { pokemons, isFetching, addMorePokemons } = useFetchPokemons(34)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPokemons = pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  if (isFetching && pokemons.length === 0) {
    return <LoadingPage />
  }

  return (
    <>
      <Header
        searchTermState={searchTerm}
        handleSearch={e => setSearchTerm(e.target.value)}
      />

      <main className='container flex flex-wrap justify-center gap-4'>
        {filteredPokemons.map((poke) => (
          <PokeCard key={poke.id} pokemon={poke} />
        ))}

        {(isFetching) ?
          <Button variant='secondary'>
            Carregando...
            <RotateCw className='animate-spin' />
          </Button> :
          (searchTerm === '') &&
          <Button variant='secondary' onClick={() => addMorePokemons(15)}>
            Carregar mais
          </Button>}
      </main>

      <Footer />
    </>
  )
}
