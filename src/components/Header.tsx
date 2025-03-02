import { Input } from '@components/ui/input'
import { Switch } from '@components/ui/switch'

interface HeaderProps {
  searchTermState: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSwitch: (checked: boolean) => void
}

export function Header({
  searchTermState,
  handleSearch,
  handleSwitch,
}: HeaderProps) {
  return (
    <header className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-center font-Pokemon-solid text-6xl">Pokédex</h1>
      </div>
      <div className="container">
        <Input
          type="search"
          className="ml-5 h-16 w-min text-xl"
          placeholder="Pesquisar Pokémon 🔍"
          value={searchTermState}
          onChange={handleSearch}
          aria-label="Pesquisar Pokémon"
        />
      </div>
      <div className="container ml-5 mt-4 flex gap-2">
        <p>Carregar mais automaticamente: </p>
        <Switch defaultChecked onCheckedChange={handleSwitch} />
      </div>
    </header>
  )
}
