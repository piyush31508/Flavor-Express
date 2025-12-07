// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../index.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState(null);       // 👈 will contain isAdmin
  const [loadingUser, setLoadingUser] = useState(true);

  // LOGIN
  async function loginUser(email, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/user/login`, { email });
      toast.success("OTP Sent Successfully!");
      localStorage.setItem("verifyToken", data.verifyToken);
      navigate("/verify");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again later.");
    } finally {
      setBtnLoading(false);
    }
  }

  // VERIFY
  async function verifyUser(otp, navigate) {
    const verifyToken = localStorage.getItem("verifyToken");
    if (!verifyToken) return toast.error("No verification token found");

    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/user/verify`, {
        verifyToken,
        otp,
      });

      toast.success("Login Successful!");

      localStorage.removeItem("verifyToken");
      localStorage.setItem("token", data.token);

      setIsAuth(true);
      setData(data.user);           // 👈 save user (with isAdmin)
      navigate("/dashboard");       // admin will go here, non-admin will be blocked by AdminRoute
      await userDetails();
    } catch (error) {
      toast.error("Failed to Login. Please try again later.");
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  }

  // FETCH /user/me
  async function userDetails() {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      setLoadingUser(false);
      return;
    }

    try {
      const res = await axios.get(`${server}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 matches backend isAuth
        },
      });

      setData(res.data);  // includes isAdmin
      setIsAuth(true);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsAuth(false);
      }

      toast.error("Failed to fetch user details.");
    } finally {
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    userDetails();
  }, []);

  // LOGOUT
  function logOut() {
    localStorage.removeItem("token");
    setIsAuth(false);
    setData(null);
    toast.success("Logged Out Successfully!");
  }

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        loginUser,
        btnLoading,
        isAuth,
        verifyUser,
        logOut,
        loadingUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
