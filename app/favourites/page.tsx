"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import SearchBar from "@/components/Search"
import Sidebar from "@/components/Sidebar"
import getAllMovies from "@/lib/getAllMovies"
import { useAuth } from "../AuthContext"

interface Movie {
  id: string
  title: string
  director: string
  imageLink: string
  rating: number
}

const Favourites = () => {
  const { userData, refreshUserData, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

  useEffect(() => {
    refreshUserData()
  }, [refreshUserData])

  useEffect(() => {
    const fetchMovies = async () => {
      const selectedMovies = await getAllMovies({ type: "selected" })
      const topMovies = await getAllMovies({ type: "top" })
      const movies = [...(selectedMovies ?? []), ...(topMovies ?? [])]
      setAllMovies(movies)
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    if (userData && allMovies.length > 0) {
      const favorites = allMovies.filter((movie) =>
        (userData.favorites as string[]).includes(movie.id)
      )
      setFavoriteMovies(favorites)
      setIsLoading(false)
    }else{
      setIsLoading(false)
    }
  }, [userData, allMovies])
  const showSkeleton = authLoading || isLoading

  return (
    <main className="flex gap-7">
      <Sidebar />
      <div className="container mx-auto px-4 py-8 h-[100vh] overflow-y-auto overflow-x-hidden">
        <SearchBar />
        {showSkeleton ? (
          <>
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-6 w-32 mb-4" />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">Saved Movies</h1>
            <p className="text-lg text-gray-500 mb-4 pb-4 border-b border-gray-300">
              {favoriteMovies.length} Movies
            </p>
          </>
        )}
        <div className="flex gap-4 flex-wrap">
          {showSkeleton
            ? Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="w-[10rem]">
                  <Skeleton className="w-[150px] h-[225px] rounded-md mb-2" />
                  <Skeleton className="h-5 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : favoriteMovies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                  <div className="w-[10rem]">
                    <img
                      src={movie.imageLink}
                      className="rounded-md w-[150px] h-[225px] object-cover"
                      alt={movie.title}
                      width={150}
                      height={225}
                    />
                    <div>
                      <p className="text-base font-bold">{movie.title}</p>
                      <p className="text-sm text-gray-500">{movie.director}</p>
                      <p className="flex gap-2">
                        <span className="flex gap-1 items-center text-sm text-gray-500">
                          <Star size={12} /> {movie.rating}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
        {!showSkeleton && favoriteMovies.length === 0 && (
          <div className="flex mt-2 flex-col items-center justify-center bg-green-100 w-fit m-auto p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">
              Save your favorite movies!
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              When you save a movie, it will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Favourites