"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  removeFromBookmarked,
  addMovieToBookmarked,
} from "../../../redux/features/bookmarkSlice";
import { MovieCardProps, MovieThunkProp } from "../../../types/movie.type";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { Toaster } from "react-hot-toast";
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Image from "next/image";

export default function MovieCard({
  title,
  poster_path,
  release_date,
  movieId,
  backdrop_path,
  movieRating,
  user,
}: MovieCardProps) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const [exists, setExists] = useState(false);
  const bookmarks = useAppSelector((state) => state.bookmark.bookmarked);
  const dispatch = useAppDispatch();

  const movieData = {
    background: backdrop_path,
    date: release_date,
    poster_path: poster_path,
    id: movieId,
    title: title,
  };

  const checkIfItemExists = async () => {
    const bookmarkCol = collection(db, `${user?.uid as string}`);
    const bookmarkSnapshot = await getDocs(bookmarkCol);
    const bookmarkList = bookmarkSnapshot.docs.map((doc) => doc.data());
    const itemExists = bookmarkList.some((item) => item.id === movieId);
    setExists(itemExists);
  };

  const [isBookmarked, setBookmarked] = useState<boolean>(() => {
    const doesMovieExist = bookmarks.find(
      (movie: any) => movie?.id === movieId
    );
    return !!doesMovieExist;
  });

  const handleAddToBookmark = () => {
    dispatch(addMovieToBookmarked(movieData));
    setBookmarked((prev) => !prev);
  };

  const handleRemoveMovieFromBookmark = () => {
    dispatch(removeFromBookmarked(movieData));
    setBookmarked((prev) => !prev);
  };

  let addIfExists = exists
    ? handleAddToBookmark
    : handleRemoveMovieFromBookmark;

  useEffect(() => {
    checkIfItemExists();
  });

  return (
    <div className='w-fit mt-[20px]'>
      <Toaster/>
      <div className='w-[250px]'>
        <Image
          src={imagePath + poster_path}
          alt={title || "movie"}
          className='h-[350px] w-[250px] max-sm:w-[350px] bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
          loading='lazy'
          width={500}
          height={500}
          blurDataURL={imagePath + backdrop_path}
          placeholder='blur'
        />
        <section className='flex items-center justify-between'>
          <div className='block'>
            <h1 className='mt-3 text-sm text-white font-semibold tracking-tight'>
              {title}
            </h1>
            <p className='text-sm flex gap-3 text-slate-400 font-normal mt-1'>
              <span>
                <StarIcon
                  style={{ fontSize: "16px" }}
                  className='text-orange-600'
                />
                {movieRating?.toFixed(1)}
              </span>
              <span>|</span>
              <span> {release_date?.substring(0, 4)}</span>
            </p>
          </div>
          <button onClick={addIfExists}>
            {exists ? (
              <BookmarkIcon
                style={{ fontSize: "20px" }}
                className='bg-blue-300  cursor-pointer'
              />
            ) : (
              <BookmarkBorderIcon
                style={{ fontSize: "20px" }}
                className='text-blue-300 cursor-pointer'
              />
            )}
          </button>
        </section>
      </div>
    </div>
  );
}
