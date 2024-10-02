"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, Clock, Menu } from "lucide-react";
import Image from "next/image";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";

interface Movie {
  id: string;
  title: string;
  director: string;
  duration: string;
  imageLink: string;
}

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setIsMobileSidebarOpen } = useAuth();

  const fetchMovies = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://advanced-internship-api-production.up.railway.app/movies?search=${query}`);
      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((query: string) => fetchMovies(query), 500),
    []
  );

  useEffect(() => {
    if (search) {
      debouncedFetch(search);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [search, debouncedFetch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);


  const handleMovieClick = (id: string) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="relative mb-8 flex items-center justify-between" ref={searchRef}>
      <div className="md:hidden mr-4">
        <Menu
          className="text-gray-400 cursor-pointer"
          onClick={() => setIsMobileSidebarOpen(true)}
        />
      </div>
      <div className="relative flex-grow max-w-[30rem]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-5"
          placeholder="Search for movies..."
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
      </div>
      {showResults && (search || loading) && (
        <div className="absolute top-12 z-10 mt-2 w-full max-w-[30rem] bg-white rounded-md shadow-lg h-fit max-h-[22rem] overflow-y-auto">
          {loading ? (
            <div className="p-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <div key={movie.id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer" onClick={() => handleMovieClick(movie.id)}>
                <Image
                  src={movie.imageLink}
                  alt={movie.title}
                  width={64}
                  height={96}
                  className="rounded"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-600">{movie.director}</p>
                  {/* <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock size={14} className="mr-1" />
                    {movie.duration}
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;