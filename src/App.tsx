import { getPokemons } from '@/lib/pokedex'
import type { Pokemon } from '@/types/pokemon'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { LoadingPage } from '@components/LoadingPage'
import { PokeCard } from '@components/PokeCard'
import { Button } from '@components/ui/button'
import { RotateCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import './css/App.css'

export function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  async function fetchPokemons(amount: number, start: number = 1) {
    setIsLoading(true)
    const fetchedPokemons = await getPokemons(amount, start)
    setPokemons(fetchedPokemons)
    setIsLoading(false)
  }

  async function addMorePokemons(amount: number = 10) {
    setIsLoading(true)
    const fetchedPokemons = await getPokemons(amount, pokemons[pokemons.length - 1].id + 1)
    setPokemons([...pokemons, ...fetchedPokemons])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPokemons(34)
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading && pokemons.length === 0) {
    return <LoadingPage />
  }

  return (
    <>
      <Header
        searchTermState={searchTerm}
        handleSearch={handleSearch}
      />

      <main className='container flex flex-wrap justify-center gap-4'>
        {filteredPokemons.map((poke) => (
          <PokeCard key={poke.id} pokemon={poke} />
        ))}

        {(isLoading) ?
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
