import { Input } from '@components/ui/input'

interface HeaderProps {
  searchTermState: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Header({ searchTermState, handleSearch }: HeaderProps) {
  return (
    <header className='container mx-auto p-4'>
      <div className='mb-4'>
        <h1 className='text-center font-PokemonSolid text-6xl'>Pokédex</h1>
      </div>
      <div className='container'>
        <Input
          type='search'
          className='ml-4 h-16 w-min text-xl'
          placeholder='Pesquisar Pokémon 🔍'
          value={searchTermState}
          onChange={handleSearch}
          aria-label='Pesquisar Pokémon'
        />
      </div>
    </header>
  )
}
