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


export interface UserProps {
  accessToken: string | any;
  auth: any;
  displayName: string;
  email: string | any;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any;
  phoneNumber: any;
  photoURL: string | any;
  proactiveRefresh: any;
  providerData: any;
  providerId: string | any;
  reloadListener: any | null;
  reloadUserInfo: any;
  tenantId: any | null;
  uid: string;
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
  user: UserProps
}


export interface MovieThunkProp {
  background?: string;
  date?: string;
  poster_path: string;
  id: number;
  title: string;
}

export type Movie = Omit<
  MovieCardProps,
  "overview" | "vote_average" | "release_date" | "runtime" | "genres"
>;
