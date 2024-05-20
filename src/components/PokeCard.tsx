import {
  getPokeAnimatedSprite,
  getPokemonSound,
  getTypeBgColor
} from '@/lib/pokedex'
import type { Pokemon } from '@/types/pokemon'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import { Sparkle } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

function playSound(url: string) {
  const audio = new Audio(url)
  audio.volume = 0.5
  audio.play()
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function PokeCard({ pokemon }: { pokemon: Pokemon }) {
  const [isShine, setIsShine] = useState(false)
  const shineIcon = useRef<HTMLSpanElement>(null)

  const playPokeSound = useCallback(() => {
    playSound(getPokemonSound(pokemon))
  }, [pokemon])

  const toggleShine = useCallback(async () => {
    setIsShine(!isShine)

    await sleep(100)
    shineIcon.current!.classList.toggle('text-yellow-400')
    shineIcon.current!.classList.toggle('font-black')

    shineIcon.current!.classList.add('animate-bounce')
    await sleep(600)
    shineIcon.current!.classList.remove('animate-bounce')

  }, [isShine])

  return (
    <Card className='cursor-pointer p-6 transition-all duration-500 hover:scale-110'>
      <CardHeader className='items-center pt-0'>
        <CardTitle className='text-center first-letter:capitalize'>
          {pokemon.name}
        </CardTitle>
        <CardDescription className='text-center'>
          {`#${pokemon.id.toString().padStart(3, '0')}`}
        </CardDescription>
      </CardHeader>

      <div className='-mt-5 flex justify-center'>
        <Button variant='ghost' className='w-10 text-primary-foreground'
          onClick={toggleShine}
        >
          <span ref={shineIcon}>
            <Sparkle size={20} />
          </span>
        </Button>
      </div>

      <CardContent>
        <img
          className='size-32 cursor-pointer transition-all duration-500 hover:scale-125'
          src={getPokeAnimatedSprite(pokemon, isShine)}
          alt={`Pokemon: ${pokemon.name}`}
          onClick={playPokeSound}
        />
      </CardContent>

      <CardFooter className='flex w-48 justify-center gap-2'>
        {pokemon.types.map((type) => (
          <Badge
            variant='secondary'
            key={type.type.name}
            className={`text-sm uppercase ${getTypeBgColor(type.type.name)}`}
          >
            {type.type.name}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
