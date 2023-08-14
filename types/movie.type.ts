export interface MovieDataProp {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: Array<string>;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  id?: number;
  genres: Array<{ id: number; name: string }>;
}

export interface MovieCardProps {
  title: string;
  movieId: number;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  id?: number;
  movieRating?: number;
  vote_average?: number;
}