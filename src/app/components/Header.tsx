"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { motion } from "framer-motion";
import { googleSignIn } from "../../../redux/features/bookmarkThunk";
import { setUser } from "../../../redux/features/bookmarkSlice";
import { usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase.config";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Image from 'next/image'

const Header = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.bookmark.user);
  const [firebaseError, setFirebaseError] = useState<string>("");

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(googleSignIn());
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      dispatch(setUser(currentUser));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className='flex px-4 py-4 items-center bg-slate-900 justify-between'>
      {firebaseError && (
        <h3 className='text-red-600 bg-red-100 px-2 py-2 rounded-md text-sm w-[20em]'>
          {firebaseError}
        </h3>
      )}
      <span className='text-sm text-orange-600'>myBookmarks</span>
      <div className='flex gap-3'>
        <button
          className='px-3 py-2 bg-blue-600 text-sm text-white rounded-full'
          onClick={handleGoogleSignIn}
        >
          {user ? "Sign out" : "Sign in"}
        </button>
        {user && (
          <Image
            src={user?.photoURL ? user?.photoURL : ""}
            alt={user?.email ? user?.email : ""}
            width={500}
            height={500}
            className='w-[30px] h-[30px] rounded-full text-white via-cyan-900 to-stone-500 bg-gradient-to-r max-sm:cursor-pointer'
            data-cy='user-profile-image'
            priority
          />
        )}
        <button
          className={`${
            pathname === "/bookmarked"
              ? "text-orange-400 font-semibold"
              : "text-white"
          } block max-sm:hidden relative`}
          data-cy='bookmark-icon'
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <BookmarkBorderIcon />
          </motion.span>
          {/* {length && ( */}
          <span className='absolute -top-[8px] -right-[10px] w-5 h-5 bg-red-600 rounded-full flex items-center font-normal justify-center text-white text-xs'>
            4
          </span>
          {/* )} */}
        </button>
      </div>
    </div>
  );
};
export default Header;
