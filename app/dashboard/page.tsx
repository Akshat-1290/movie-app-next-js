import React from "react";
import MoviesCarousel from "./components/MoviesCarousel";
import SearchBar from "@/components/Search";
import getAllMovies from "@/lib/getAllMovies";

async function Dashboard() {
  const selectedMovies: Promise<Movies[] | undefined> = getAllMovies({type : "selected"});
  const topMovies: Promise<Movies[] | undefined> = getAllMovies({type : "top"});
  const [selectedMoviesData, topMoviesData] = await Promise.all([selectedMovies, topMovies]);

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto overflow-x-hidden">
      <SearchBar />
      <div className="mb-7">
        <h1 className="text-4xl font-bold mb-2">AI Movie Summariser</h1>
        <p className="text-xl text-muted-foreground">
          Enjoy high-quality summaries of your favourite movies instantly
          without breaking a sweat.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Selected just for you</h2>
        <p className="text-muted-foreground mb-2 text-base">
          We think you'll like these.
        </p>
        <MoviesCarousel movies={selectedMoviesData} />
      </div>
      <div className="mt-7">
        <h2 className="text-2xl font-semibold mb-4">Top Movies</h2>
        <p className="text-muted-foreground mb-6">
          Enjoy our highest rated films.
        </p>
        <MoviesCarousel movies={topMoviesData} />
      </div>
    </div>
  );
}

export default Dashboard;
