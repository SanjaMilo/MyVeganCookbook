import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const useLoginSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
 
  // dispatch actions to update state
  const dispatch = useDispatch();
  // 'access_token' will be our name for the cookie. We need the function that sets the cookies, not the cookies
  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const login = async (email, password, url) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      // Set the token that we send from the server with the response, into a cookie
      setCookies("access_token", data.token, { path: '/' }); // expires: new Date(Date.now() + 3600000 * 24 * 7) expires in 7 days
      // We want to store the user id in local storage for quick access to it
      localStorage.setItem("userID", data.userID);
      // Update the global state (user)
      dispatch(loginUser(data));

      setIsLoading(false);

      navigate('/');
    }

  };

  return { login, isLoading, error };

};
