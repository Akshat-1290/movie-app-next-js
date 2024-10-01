"use client"

import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/Search'
import Sidebar from '@/components/Sidebar'
import { Skeleton } from "@/components/ui/skeleton"
import getMovie from '@/lib/getMovie'
import AudioPlayerComponent from '../components/AudioPlayer'

interface MovieItem {
  id: string
  title: string
  director: string
  summary: string
  audioLink: string
  imageLink: string
}

type Props = {
  params: {
    movieid: string
  }
}

function SummarizerSkeleton() {
  return (
    <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row h-[100vh] overflow-y-auto overflow-x-hidden">
      <div className="flex-1 lg:pr-8">
        <SearchBar />
        <Skeleton className="h-8 w-3/4 mb-5" />
        <Skeleton className="h-px w-full mb-7" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full mb-4" />
        ))}
        <div className="mt-8">
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  )
}

function Summarizer({ params: { movieid } }: Props) {
  const [movieItemData, setMovieItemData] = useState<MovieItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movie = await getMovie(movieid)
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
      <main className='flex gap-7'>
        <Sidebar />
        <SummarizerSkeleton />
      </main>
    )
  }

  if (!movieItemData) {
    return <div>Movie not found</div>
  }

  return (
    <main className='flex gap-7'>
      <Sidebar />
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row h-[100vh] overflow-y-auto overflow-x-hidden">
        <div className="flex-1 lg:pr-8">
          <SearchBar />
          <h1 className='font-bold text-2xl pb-5 border-b-2 border-gray-300'>{movieItemData.title}</h1>
          <p className='whitespace-pre-line pt-7'>{movieItemData.summary}</p>
          <AudioPlayerComponent
            audioSrc={movieItemData.audioLink}
            movieTitle={movieItemData.title}
            movieDirector={movieItemData.director}
            movieImage={movieItemData.imageLink}
          />
        </div>
      </div>
    </main>
  )
}

export default Summarizer