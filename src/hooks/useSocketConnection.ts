import socket from "@/lib/socket";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export const useSocketConnection = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      // console.log("Socket connecting...");
    }

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      // console.log({ user });

      if (user) {
        console.log("Adding user to online users...");
        socket.emit("add_online_user", {
          userId: user._id,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user]);
};
