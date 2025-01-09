import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/register",
        element: <Signup/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
    ],
    // {
    //   future: {
    //     v7_startTransition: true,
    //     v7_relativeSplatPath: true,
    //     v7_fetcherPersist: true,
    //     v7_normalizeFormMethod: true,
    //     v7_partialHydration: true,
    //     v7_skipActionErrorRevalidation: true,
    //   },
    // }
  );

  // const [socket,setSocket] = useState(null);  
  const {authUser} = useSelector(store=>store.user)
  const {socket} = useSelector(store=>store.socket)
  const dispatch = useDispatch()
  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8081', {
          query: { userId: authUser._id },
      });


    //   const socket = io('http://192.168.43.217:8081', {
    //     query: { userId: authUser._id },
    // });




      setSocket(socket);
      
      // return () => {
      //   socketInstance.disconnect();
      // };
      dispatch(setSocket(socket))
      socket.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })
      return ()=> socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null))
      }
    }
  },[authUser])
  
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
