"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Bookmark, Clock, Mic, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/Sidebar"
import SearchBar from "@/components/Search"
import getMovie from "@/lib/getMovie"
import FavoriteButton from "../components/FavoriteButton"
import { useAuth } from "@/app/AuthContext"
import { useRouter } from "next/navigation"

interface MovieItem {
  id: string
  title: string
  director: string
  rating: number
  type: string
  releaseYear: number
  tags: string[]
  movieDescription: string
  imageLink: string
}

interface MovieItemProps {
  params: {
    movieid: string
  }
}

function MovieItemSkeleton() {
  return (
    <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row h-[100vh] overflow-y-auto overflow-x-hidden">
      <div className="flex-1 lg:pr-8">
        <SearchBar />
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-4" />

        <div className="flex flex-wrap gap-4 mb-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>

        <Skeleton className="h-10 w-[95%] mb-4" />
        <Skeleton className="h-10 w-[95%] mb-6" />

        <Skeleton className="h-8 w-48 mb-3" />
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16" />
          ))}
        </div>

        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
      </div>
      <div className="w-[12rem] mt-16">
        <Skeleton className="w-full h-[18rem] rounded-lg" />
      </div>
    </div>
  )
}

function MovieItem({ params: { movieid } }: MovieItemProps) {
  const [movieItemData, setMovieItemData] = useState<MovieItem | null>(null)
  const [loading, setLoading] = useState(true)
  const {userData , setIsAuthModalOpen} = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movie = await getMovie(movieid)
        console.log(movie)
        setMovieItemData(movie || null)
      } catch (error) {
        console.error("Failed to fetch movie:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [movieid])

  if (loading) {
    return (
      <main className="flex gap-7">
        <Sidebar />
        <MovieItemSkeleton />
      </main>
    )
  }

  if (!movieItemData) {
    return <div>Movie not found</div>
  }

  return (
    <main className="flex gap-7">
      <Sidebar />
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row h-[100vh] overflow-y-auto overflow-x-hidden">
        <div className="flex-1 lg:pr-8">
          <SearchBar />
          <h1 className="text-4xl font-bold mb-2">{movieItemData.title}</h1>
          <p className="text-xl text-gray-500 mb-4">{movieItemData.director}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold">{movieItemData.rating} / 10</span>
            </div>
            <div className="flex items-center">
              <Mic className="w-5 h-5 text-gray-400 mr-1" />
              <span>{movieItemData.type}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">{movieItemData.releaseYear}</span>
            </div>
          </div>

          <Button
            className="w-[95%] mb-4 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => {
              if (!userData) {
                setIsAuthModalOpen(true);
              } else if (userData.plan === "basic" && movieItemData.subscriptionRequired) {
                router.push("/plans");
              } else {
                router.push(`/player/${movieid}`);
              }
            }}
          >
            <Zap className="w-5 h-5 mr-2" />
            Summarise
          </Button>

          <FavoriteButton movieid={movieid} />

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">What's it about?</h2>
            <div className="flex flex-wrap gap-2">
              {movieItemData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed pb-7">
            {movieItemData.movieDescription}
          </p>
        </div>
        <div className="w-[12rem] mt-16">
          <img
            src={movieItemData.imageLink}
            alt={movieItemData.title}
            className="w-full rounded-lg"
            width={192}
            height={288}
          />
        </div>
      </div>
    </main>
  )
}

export default MovieItem