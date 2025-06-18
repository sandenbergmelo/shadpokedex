import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'

export function SkeletonPokeCard() {
  return (
    <Card className="w-60 cursor-pointer
     bg-slate-700/20 p-6 transition-all duration-500 hover:scale-110"
    >
      <CardHeader className="items-center pt-0">
        <CardTitle className="text-center first-letter:capitalize">
          <Skeleton className="h-5 w-24" />
        </CardTitle>
        <CardDescription className="text-center">
          <Skeleton className="h-4 w-12" />
        </CardDescription>
      </CardHeader>

      <div className="-mt-5 flex justify-center">
        <Button variant="ghost" className="w-10 text-[#131f3b]" disabled>
          <span>
            <Skeleton className="size-5 rounded-full" />
          </span>
        </Button>
      </div>

      <CardContent className="flex justify-center">
        <Skeleton className="size-32" />
      </CardContent>

      <CardFooter className="justify-center gap-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-12" />
      </CardFooter>
    </Card>
  )
}
