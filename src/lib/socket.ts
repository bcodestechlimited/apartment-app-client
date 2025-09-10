import { io } from "socket.io-client";

const apiUrl: string = import.meta.env.VITE_API_URL || "http://localhost:5000";

const socket = io(apiUrl, {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
