"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/AuthContext"

interface Movie {
  id: string
  title: string
  director: string
  imageLink: string
  rating: number
  subscriptionRequired: boolean
}

function MovieCarouselSkeleton() {
  return (
    <div className="embla__container flex">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] pl-4"
        >
          <Card className="h-full">
            <CardContent className="p-4 relative">
              <Skeleton className="w-full aspect-[2/3] rounded-md mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-10" />
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

function MoviesCarousel({ movies }: { movies: Movie[] | undefined; isLoading: boolean }) {
  const {userData , loading} = useAuth()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        {loading ? (
          <MovieCarouselSkeleton />
        ) : (
          <div className="embla__container flex">
            {movies?.map((movie) => (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] pl-4"
              >
                <Card className="h-full cursor-pointer">
                  <CardContent className="p-4 relative">
                    {(userData === null && movie.subscriptionRequired || (userData && movie.subscriptionRequired && userData.plan === "basic")) && (
                      <Badge variant="premium">Premium</Badge>
                    )}
                    <img
                      alt={`${movie.title} poster`}
                      className="w-full aspect-[2/3] object-cover rounded-md mb-4"
                      height="360"
                      src={movie.imageLink}
                      width="240"
                    />
                    <h3 className="font-semibold text-base">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {movie.director}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>★ {movie.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-[7px] top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-md"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-[7px] top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-md"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default MoviesCarousel