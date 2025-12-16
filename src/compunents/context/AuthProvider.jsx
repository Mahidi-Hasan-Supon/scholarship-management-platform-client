import React, { useEffect, useState } from "react";

import {

  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { set } from "react-hook-form";
// import { AuthContext } from "/compunents/context/AuthContext";




const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth ,email, password,);
  };
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth ,email, password);
  };
  const signInWithPopupFunc = () => {
    setLoading(true)
    return signInWithPopup(auth ,googleProvider);
  };
  const signOutFunc = () => {
    setLoading(true)
    return signOut(auth);
  };
  const updateProfileFunc =(profile)=>{
    setLoading(true)
    return updateProfile(auth.currentUser , profile)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  });
  const appInfo = {
    user,
    setUser,
    loading,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithPopupFunc,
    signOutFunc,
    updateProfileFunc
  };
  return <AuthContext value={appInfo}>{children}</AuthContext>;
};

export default AuthProvider;
