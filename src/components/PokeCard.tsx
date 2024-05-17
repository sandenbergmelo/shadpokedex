import {
  getPokeAnimatedSprite,
  getPokemonSound,
  getTypeBgColor
} from '@/lib/pokedex'
import type { Pokemon } from '@/types/pokemon'
import { Badge } from '@components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import { useCallback } from 'react'

function playSound(url: string) {
  const audio = new Audio(url)
  audio.volume = 0.5
  audio.play()
}

export function PokeCard({ pokemon }: { pokemon: Pokemon }) {
  const playPokeSound = useCallback(() => {
    playSound(getPokemonSound(pokemon))
  }, [pokemon])

  return (
    <Card className='hover:scale-110 transition-all duration-500 cursor-pointer p-6'>
      <CardHeader className='pt-0'>
        <CardTitle className='text-center first-letter:capitalize'>
          {pokemon.name}
        </CardTitle>
        <CardDescription className='text-center'>
          {`#${pokemon.id.toString().padStart(3, '0')}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          className='size-32 hover:scale-125 transition-all duration-500 cursor-pointer'
          src={getPokeAnimatedSprite(pokemon)}
          alt={`Pokemon: ${pokemon.name}`}
          onClick={playPokeSound}
        />
      </CardContent>
      <CardFooter className='flex justify-center gap-2 w-48'>
        {pokemon.types.map((type) => (
          <Badge
            variant='secondary'
            key={type.type.name}
            className={`uppercase text-sm ${getTypeBgColor(type.type.name)}`}
          >
            {type.type.name}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
