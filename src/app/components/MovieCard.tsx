"use client";

import Image from "next/image";
import Link from "next/link";
import { MovieCardProps } from "../../../types/movie.type";
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function MovieCard({
  title,
  movieId,
  poster_path,
  release_date,
  backdrop_path,
  movieRating,
}: MovieCardProps) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className='w-fit mt-[20px]'>
      <div className='w-[250px]'>
        <Link href={`movies/${movieId}`}>
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
        </Link>
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
          <BookmarkBorderIcon
            style={{ fontSize: "20px" }}
            className='text-blue-300 cursor-pointer'
          />
        </section>
      </div>
    </div>
  );
}
