import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase.config";

//user logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

//Google sign-in
export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const googleAuthProvider = new GoogleAuthProvider();
  await signInWithPopup(auth, googleAuthProvider);
});
