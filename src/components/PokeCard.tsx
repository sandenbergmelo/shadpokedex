import { getPokeAnimatedSprite, getTypeBgColor } from '@/lib/pokedex'
import { Badge } from '@components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import type { PokeAPI } from 'pokeapi-types'

export function PokeCard({ pokemon }: { pokemon: PokeAPI.Pokemon }) {
  return (
    <Card className='hover:scale-110 transition-all duration-500 cursor-pointer'>
      <CardTitle className='text-center first-letter:capitalize pt-2'>
        {pokemon.name}
      </CardTitle>
      <CardDescription className='text-center'>
        {`#${pokemon.id.toString().padStart(3, '0')}`}
      </CardDescription>
      <CardHeader>
        <CardContent>
          <img
            className='size-32 hover:scale-125 transition-all duration-500 cursor-pointer'
            src={getPokeAnimatedSprite(pokemon)}
            alt={`Pokemon: ${pokemon.name}`}
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
      </CardHeader>
    </Card>
  )
}
