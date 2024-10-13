// src/hooks/useNotificationSocket.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { getNotificationThunk } from "../../redux/thunk/notificationThunk";

const useNotificationSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to the server socket with WebSocket only (avoiding polling)
    const socket = io("http://your-server-url", {
      transports: ["websocket"], // Force WebSocket transport
    });

    // When socket connection is established
    socket.on("connect", () => {
      console.log("Socket connected to server");
    });

    // Listen for new notifications from the server
    socket.on("newNotification", (notification) => {
      console.log("New notification received:", notification);

      // Option 1: Fetch updated notifications from the server
      dispatch(getNotificationThunk());

      // Option 2: Directly update the notification list in Redux
      // dispatch(setNotificateList([...currentNotifications, notification]));
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};

export default useNotificationSocket;
