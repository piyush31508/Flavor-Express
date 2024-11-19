import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { server } from '../index.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [btnLoading, setBtnLoading] = useState(false);
    async function loginUser(email, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/user/login`, { email });
            toast.success("OTP Sent Successfully!");
            localStorage.setItem("verifyToken", data.verifyToken);
            navigate('/Flavour-Express/verify');
            setBtnLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to sent OTP. Please try again later.");
            setBtnLoading(false);
        }
    }

    const [isAuth, setIsAuth] = useState(false);

    async function verifyUser(otp, navigate) {
        const verifyToken = localStorage.getItem('verifyToken');
        if (!verifyToken) {
            return toast.error('No verification token found');
        }

        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/user/verify`, { verifyToken, otp });
            toast.success("Login Successful!");
            localStorage.clear();
            localStorage.setItem('token', data.token);
            navigate('/');
            setBtnLoading(false);
            setIsAuth(true);
            userDetails();
        } catch (error) {
            console.log(error);
            toast.error("Failed to Login. Please try again later.");
            setBtnLoading(false);
            setIsAuth(false);

        }

    }

    const [data, setData] = useState();
    
    async function userDetails(){
        const token = localStorage.getItem('token');
        console.log('token', token);

        if (!token) {
            setIsAuth(false);
            return 
        }
        try {
            const { data } = await axios.get(`${server}/user/me`, { headers: { token: `${token}` } });
            setData(data);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch user details.");
        }
    }

    useEffect(() => {
        userDetails();

    },[]);

    async function logOut() {
        localStorage.clear();
        setIsAuth(false);
        toast.success("Logged Out Successfully!");
    }

    return (
        <UserContext.Provider value={{ data, setData, loginUser, btnLoading, isAuth, verifyUser, logOut }}>
            {children}
            <Toaster />
        </UserContext.Provider>
    )
}

export const UserData = () => useContext(UserContext);