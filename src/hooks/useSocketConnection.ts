import socket from "@/lib/socket";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export const useSocketConnection = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      if (user) {
        socket.emit("add_online_user", {
          userId: user._id,
        });
      }
    });

    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user]);
};
