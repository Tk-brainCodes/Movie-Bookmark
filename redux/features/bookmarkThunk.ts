import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MovieThunkProp } from "../../types/movie.type";
import {
  setDoc,
  deleteDoc,
  collection,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import {
  addBookmarkFail,
  addMovieToBookmarked,
  getBookmarkError,
  removeFromBookmarked,
  updateBookmarks,
} from "./bookmarkSlice";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";
import toast from "react-hot-toast";
import firebase from "firebase/compat/app";

export const notifySuccess = (message: string) => toast.success(message);
export const notifyError = (message: string) => toast.error(message);

//user logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

//Google sign-in
export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  await signInWithPopup(auth, googleAuthProvider);
});

//add movies bookmarks
export const addMovieToBookmarkedDB = createAsyncThunk(
  "bookmark/addMovieToBookmarked",
  async (movie: MovieThunkProp, { dispatch, getState }) => {
    const state = getState() as RootState;
    const user = state.bookmark.user;
    const movieId = movie.id.toString();
    const { background, date, id, poster_path, title } = movie;

    try {
      const bookmarkedItemRef = doc(db, `${user?.uid as string}`, movieId);
      const docSnap = await getDoc(bookmarkedItemRef);

      if (docSnap.exists()) {
        const existItem = docSnap.data();
        dispatch(
          addBookmarkFail(existItem.title + " already an existing item")
        );
      } else {
        notifySuccess(`adding ${title} to bookmarks`);
        await setDoc(doc(db, `${user?.uid as string}`, movieId), {
          background,
          date,
          id,
          poster_path,
          title,
        });
        notifySuccess(`${title} has been successfully added`);
        dispatch(addMovieToBookmarked(movie));
      }
    } catch (error: any) {
      notifyError(`failed to add  ${title}  ${error}`);
      dispatch(
        addBookmarkFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : "Failed to add " + title + ": " + error.message
        )
      );
    }
  }
);

//remove movies from bookmarks
export const removeMovieFromBookmarks = createAsyncThunk(
  "bookmark/removeMovieFromBookmarks",
  async (id: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const user = state.bookmark.user;
    const movieId = id.toString();
    try {
      dispatch(removeFromBookmarked(id));
      await deleteDoc(doc(db, `${user?.uid as string}`, movieId));
      notifySuccess(`Movie Id: ${id} was successfully deleted`);
    } catch (error: any) {
      notifyError(`failed to remove  ${id}`);
      dispatch({
        type: "ADD_BOOKMARK_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

//retrieve all bookmarked movies
export const getBookmarksFromFirebaseDB = createAsyncThunk(
  "bookmark/getBookmarksFromFirebaseDB",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const user = state.bookmark.user;
    const getBookmarkItems = async (db: any) => {
      const bookmarkCol = collection(db, `${user?.uid as string}`);
      const bookmarkSnapshot = await getDocs(bookmarkCol);
      const bookmarkList = bookmarkSnapshot.docs.map((doc) => doc.data() as MovieThunkProp);
      return bookmarkList;
    };
    try {
      let allBookmarks = await getBookmarkItems(db);
      dispatch(updateBookmarks(allBookmarks));
      if (allBookmarks.length) {
        const bookmarkStateString = JSON.stringify(allBookmarks);
        if (typeof window !== "undefined") {
          localStorage.setItem("myBookmarks", bookmarkStateString);
        }
      }
    } catch (error: any) {
      dispatch(
        getBookmarkError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  }
);

// export const getBookmarksFromFirebaseDB = createAsyncThunk(
//   "bookmark/getBookmarksFromFirebaseDB",
//   async (_, { getState, dispatch }) => {
//     const state = getState() as RootState;
//     const user = state.bookmark.user;
//     const db = firebase.firestore(); 
//     const collectionRef = db.collection(`${user?.uid as string}`);
//     const initialSnapshot = await collectionRef.get();
//     const initialBookmarkList = initialSnapshot.docs.map(
//       (doc) => doc.data() as MovieThunkProp
//     );
//     dispatch(updateBookmarks(initialBookmarkList));
//     const unsubscribe = collectionRef.onSnapshot((snapshot) => {
//       const updatedBookmarkList = snapshot.docs.map(
//         (doc) => doc.data() as MovieThunkProp
//       );
//       dispatch(updateBookmarks(updatedBookmarkList));
//     });
//     return () => unsubscribe();
//   }
// );

