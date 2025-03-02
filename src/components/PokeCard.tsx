import { playSound, sleep } from '@/lib/functions'
import {
  getPokeAnimatedSprite,
  getPokeTypeBgClassName,
  getPokemonSound,
} from '@/lib/pokedex'
import { cn } from '@/lib/utils'
import type { Pokemon } from '@/types/pokemon'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Sparkle } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

export function PokeCard({ pokemon }: { pokemon: Pokemon }) {
  const [isShine, setIsShine] = useState(false)
  const shineIcon = useRef<HTMLSpanElement>(null)

  const toggleShine = useCallback(async () => {
    setIsShine((prev) => !prev)

    await sleep(100)
    shineIcon.current!.classList.toggle('text-yellow-400')
    shineIcon.current!.classList.toggle('font-black')

    shineIcon.current!.classList.add('animate-bounce')
    await sleep(600)
    shineIcon.current!.classList.remove('animate-bounce')
  }, [])

  return (
    <Card className="w-60 bg-slate-700/20 p-6 transition-all duration-500 hover:scale-110">
      <CardHeader className="items-center pt-0">
        <CardTitle className="text-center first-letter:capitalize">
          {pokemon.name}
        </CardTitle>
        <CardDescription className="text-center">
          {`#${pokemon.id.toString().padStart(3, '0')}`}
        </CardDescription>
      </CardHeader>

      <div className="-mt-5 flex justify-center">
        <Button
          variant="ghost"
          className="w-10 text-[#131f3b] cursor-pointer"
          onClick={toggleShine}
        >
          <span ref={shineIcon}>
            <Sparkle size={20} />
          </span>
        </Button>
      </div>

      <CardContent>
        <img
          className="h-32 cursor-pointer transition-all duration-500 hover:scale-125"
          src={getPokeAnimatedSprite(pokemon, isShine)}
          alt={`Pokemon: ${pokemon.name}`}
          onClick={() => playSound(getPokemonSound(pokemon))}
        />
      </CardContent>

      <CardFooter className="justify-center gap-2">
        {pokemon.types.map((type) => {
          const bgClassName = getPokeTypeBgClassName(type.type.name)

          return (
            <Badge
              variant="secondary"
              key={type.type.name}
              className={cn('text-sm uppercase cursor-default', bgClassName)}
            >
              {type.type.name}
            </Badge>
          )
        })}
      </CardFooter>
    </Card>
  )
}
