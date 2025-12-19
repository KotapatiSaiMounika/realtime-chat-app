import { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();
export const AuthProvider = ({ children }) =>{

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const navigate= useNavigate();

  // CHeck is user is authenticated and if so, set the user data and connect the socket
  const checkAuth = async ()=>{
    try{
      const {data} =await axios.get("/api/auth/check");
      if (data.success){
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    }catch(error){
      toast.error(error.response?.data?.message || error.message);

    }
  }

  // Login function to handle user Authentication and Socket Connection
  const login = async (state, credentials)=>{
    try{
      const { data } =await axios.post(`/api/auth/${state}`, credentials);
      if(data.success){
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        navigate("/")
      }
      else{
        toast.error(data.message);
      }
    } catch (error){
      toast.error(error.response?.data?.message || error.message);

    }
  }

  // Logout function to handle user logout and socket disconnection
  const logout = async () => {
  localStorage.removeItem("token");
  setToken(null);
  setAuthUser(null);
  setOnlineUsers([]);
  axios.defaults.headers.common["token"] = null;

  if (socket) {
    socket.disconnect();
    setSocket(null); // 👈 THIS WAS MISSING
  }

  toast.success("Logged out successfully");
};


  //Update Profile function to handle user profile updates
  const updateProfile = async (body)=>{
    try{
      const {data} = await axios.put("/api/auth/update-profile", body);
      if(data.success){
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    }catch(error){
        toast.error(error.response?.data?.message || error.message);

      }
  }

  // Connect socket function to handle socket connection and online users updates
  const connectSocket = (userData) => {
  if (!userData) return;

  if (socket) {
    socket.disconnect();
  }

  const newSocket = io(backendUrl, {
    query: { userId: userData._id },
    transports: ["websocket"],
  });

  setSocket(newSocket);

  newSocket.on("getOnlineUsers", (users)=>{setOnlineUsers(users)});
};


  useEffect(() => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
    checkAuth();
  }
}, [token]);

  useEffect(() => {
  return () => {
    socket?.disconnect();
  };
}, [socket]);


  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}