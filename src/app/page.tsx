"use client"

import { results } from "../../data/movie";
import MovieCard from "./components/MovieCard";
import AnimatedWrapper from "./components/AnimationWrapper";

export default function Home() {

  return (
    <div className='h-auto'>
      <h1 className="text-2xl text-white font-semibold">Movies</h1>
      <AnimatedWrapper>
        <div className='grid grid-cols-fluid gap-3 items-center max-sm:flex max-sm:justify-center max-sm:flex-col'>
          {results.map((movie) => (
            <div key={movie?.id}>
              <MovieCard
                title={movie?.title as string}
                movieId={movie?.id as number}
                poster_path={movie?.poster_path as string}
                backdrop_path={movie?.backdrop_path as string}
                release_date={movie?.release_date as string}
                movieRating={movie?.vote_average as number}
              />
            </div>
          ))}
        </div>
      </AnimatedWrapper>
    </div>
  );
}
