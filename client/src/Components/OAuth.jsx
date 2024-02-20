import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signinSuccess, signinFailure } from "../Redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, Provider);
      //console.log(result);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
        }),
      });
      const data = await response.json();
      //console.log(data);
      if (data === false) {
        dispatch(signinFailure(data.errMessage));
      }
      dispatch(signinSuccess(data));
      navigation("/");
    } catch (err) {
      console.log(` could not connect with Google : `, err);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-600 text-white p-3 text-lg rounded-lg hover:cursor-pointer"
      onClick={handleGoogleClick}
    >
      Continue with Google
    </button>
  );
}
