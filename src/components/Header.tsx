import { Input } from '@components/ui/input'

interface HeaderProps {
  searchTermState: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Header({ searchTermState, handleSearch }: HeaderProps) {
  return (
    <header className='container mx-auto p-4'>
      <div className='mb-4'>
        <h1 className='text-6xl text-center font-PokemonSolid'>Pokédex</h1>
      </div>
      <div className='container mx-auto'>
        <Input
          type='search'
          className='w-min ml-4 h-16 text-xl'
          placeholder='Pesquisar Pokémon 🔍'
          value={searchTermState}
          onChange={handleSearch}
        />
      </div>
    </header>
  )
}
