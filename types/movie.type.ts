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


