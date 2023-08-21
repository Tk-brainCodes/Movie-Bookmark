"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import {
  getBookmarksFromFirebaseDB,
  removeMovieFromBookmarks,
} from "../../../redux/features/bookmarkThunk";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

const Bookmark = () => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const [storedBookmarks, setStoredBookmarks] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBookmarksFromFirebaseDB());
  }, [dispatch]);

  useEffect(() => {
    const storedBookmarksInLocalStorage =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("myBookmarks") || "[]")
        : "";
    setStoredBookmarks(
      storedBookmarksInLocalStorage,
   );
  }, []);

  return (
    <div className='px-6 py-6 w-[100vw]'>
      <h1 className='font-semibold mb-[20px] text-white'>My Bookmarks</h1>
      <div>
        {storedBookmarks?.length === 0 ? (
          <h2>Sorry no bookmarks :(</h2>
        ) : (
          <>
            <div className='grid grid-cols-fluid gap-3 items-center max-sm:flex max-sm:justify-center max-sm:flex-col'>
              {storedBookmarks?.map((movie: any) => (
                <div key={movie?.id} className='w-[250px]'>
                  <Image
                    src={imagePath + movie?.poster_path}
                    alt={`${movie?.title || ""}`}
                    className='h-[350px] w-[250px] bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
                    loading='lazy'
                    width={500}
                    height={500}
                    blurDataURL={imagePath + movie?.poster_path}
                    placeholder='blur'
                  />
                  <div className='flex gap-2 relative -mt-[20em] float-right px-2'>
                    <button
                      title='bookmark movie'
                      className={`text-xs bg-white text-slate-500 px-3 py-3 hover:scale-110 transition ease-in-out rounded-full`}
                      onClick={() =>
                        dispatch(removeMovieFromBookmarks(movie?.id))
                      }
                    >
                      <DeleteIcon className='text-red-500' />
                    </button>
                  </div>
                  <h1 className='mt-3 text-sm text-white font-semibold tracking-tight'>
                    {movie?.title}
                  </h1>
                  <p className='text-slate-400 font-normal mt-1'>
                    <span>{movie?.date?.substring(0, 4)}</span>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
