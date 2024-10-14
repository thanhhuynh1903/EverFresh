// src/hooks/useNotificationSocket.js

import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getNotificationThunk } from "../../redux/thunk/notificationThunk";
import { selectUser } from "../../redux/selector/selector";

const url = process.env.EXPO_PUBLIC_API_LINK;

const useNotificationSocket = () => {
  const dispatch = useDispatch();
  const userRedux = useSelector(selectUser);

  useEffect(() => {
    const socket = io(url, {
      transports: ["websocket"], // Force WebSocket transport
    });
    console.log("get in");

    socket.on("connect", () => {
      console.log("Socket connected to server");
    });

    socket.on(`notifications-${userRedux.user._id}`, (notification) => {
      console.log("New notification received:", notification);
      dispatch(getNotificationThunk());
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};

export default useNotificationSocket;
