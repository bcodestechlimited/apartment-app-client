import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import socket from "@/lib/socket";
import { messageService } from "@/api/message.api";
import { useAuthStore } from "@/store/useAuthStore";
import type { IMessage } from "@/interfaces/message.interface";

interface OnlineUser {
  socketId: string;
  userId: string;
}

export const useChat = () => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["conversations"],
    queryFn: messageService.getConversations,
  });

  const { user } = useAuthStore();

  useEffect(() => {
    console.log(`UseChat initialized...`);

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("get_online_users", (res) => {
      console.log(res);
    });

    return () => {
      socket.off("get_online_users");
    };
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    console.log({ user });

    if (user) {
      socket.emit("add_online_user", {
        userId: user._id,
      });
    }
  }, [user]);

  return {
    conversations: data?.conversations || [],
    isLoading,
    isError,
  };
};

export const useChatWindow = (
  conversationId: string,
  currentUserId: string,
) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => messageService.getMessages(conversationId),
    enabled: !!conversationId,
  });

  // console.log({ messages: data });

  useEffect(() => {
    if (!conversationId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("receive_message", (message: IMessage) => {
      console.log(`Received message: ${message}`);
      console.log({ message });
      setMessages((prev) => [...prev, message]);
    });

    socket.on(
      "receive_typing_status",
      (payload: { isTyping: boolean; recipientId: string }) => {
        console.log({ payload });
        setIsTyping(payload.isTyping);
      },
    );

    socket.on("get_online_users", (res) => {
      console.log(res);
    });

    return () => {
      socket.off("receive_message");
      socket.off("get_online_users");
    };
  }, [conversationId]);

  useEffect(() => {
    if (data) {
      setMessages(data.messages || []);
    }
  }, [data]);

  const sendMessage = (text: string, receiverId: string) => {
    if (!text.trim()) return;
    socket.emit("send_message", {
      conversationId,
      senderId: currentUserId,
      receiverId: receiverId,
      text,
    });
  };

  return {
    messages,
    sendMessage,
    conversation: data?.conversation || [],
    isTyping,
    setIsTyping,
    isLoading,
    isError,
  };
};
