import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieThunkProp } from "../../types/movie.type";
import { UserProps } from "../../types/movie.type";


let localStorageBookmarks =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("myBookmarks") as string)
    : "";

interface BookMarkState {
  bookmarked: MovieThunkProp[];
  error: string | null;
  bookmarkError: string | null;
  user: UserProps | null;
}

const initialState: BookMarkState = {
  bookmarked: localStorageBookmarks ? localStorageBookmarks : [],
  error: null,
  bookmarkError: null,
  user: null,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addMovieToBookmarked(state, action: PayloadAction<MovieThunkProp>) {
      state.bookmarked.unshift(action.payload);
    },
    removeFromBookmarked(state, action: PayloadAction<number>) {
      state.bookmarked = state.bookmarked.filter(
        (movie) => movie.id !== action.payload
      );
    },
    addBookmarkFail(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getBookmarkError(state, action: PayloadAction<string>) {
      state.bookmarkError = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  addMovieToBookmarked,
  removeFromBookmarked,
  addBookmarkFail,
  getBookmarkError,
  setUser,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
