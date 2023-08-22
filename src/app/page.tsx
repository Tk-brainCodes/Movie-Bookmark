"use client";

import { useEffect } from 'react';
import { results } from "../../data/movie";
import { useAppSelector } from "../../redux/hooks";
import MovieCard from "./components/MovieCard";
import AnimatedWrapper from "./components/AnimationWrapper";
import { getBookmarksFromFirebaseDB } from "../../redux/features/bookmarkThunk";
import { useAppDispatch } from '../../redux/hooks';


export default function Home() {
  const user: any = useAppSelector((state) => state.bookmark.user);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getBookmarksFromFirebaseDB());
  }, [dispatch])

  return (
    <>
      <div className='h-auto px-4 py-4'>
        <h1 className='text-2xl text-white font-semibold'>Movies</h1>
        <AnimatedWrapper>
          <div className='grid grid-cols-fluid gap-3 items-center max-sm:flex max-sm:justify-center max-sm:flex-col'>
            {results.map((movie) => {
              return (
                <div key={movie?.id}>
                  <MovieCard
                    title={movie?.title as string}
                    movieId={movie?.id as number}
                    poster_path={movie?.poster_path as string}
                    backdrop_path={movie?.backdrop_path as string}
                    release_date={movie?.release_date as string}
                    movieRating={movie?.vote_average as number}
                    user={user}
                  />
                </div>
              );
            })}
          </div>
        </AnimatedWrapper>
      </div>
    </>
  );
}
