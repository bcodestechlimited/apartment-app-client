import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import type { IMessage, IConversation } from "@/interfaces/message.interface";

class MessageService {
  // Get all conversations
  getConversations = async (): Promise<
    { conversations: IConversation[] } | undefined
  > => {
    try {
      const response = await axiosInstance.get(`/message/conversation`);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch conversations");
    }
  };

  createConversation = async (payload: { receiverId: string }) => {
    try {
      const response = await axiosInstance.post(
        `/message/conversation`,
        payload,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to create conversation");
    }
  };

  // Get a specific conversation
  getConversation = async (
    conversationId: string,
  ): Promise<IConversation | undefined> => {
    try {
      const response = await axiosInstance.get(
        `/message/conversation/${conversationId}`,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch conversation");
    }
  };

  // Get all messages for a conversation
  getMessages = async (
    conversationId: string,
  ): Promise<
    { conversation: IConversation; messages: IMessage[] } | undefined
  > => {
    try {
      const response = await axiosInstance.get(
        `/message/conversation/${conversationId}/messages`,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to fetch messages");
    }
  };

  // Send a message to a conversation
  sendMessage = async (payload: {
    conversationId: string;
    text: string;
  }): Promise<IMessage | undefined> => {
    try {
      const response = await axiosInstance.post(`/message`, payload);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to send message");
    }
  };

  // Optional: Mark messages as read
  markAsRead = async (conversationId: string): Promise<any> => {
    try {
      const response = await axiosInstance.post(
        `/message/conversation/${conversationId}/read`,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to mark messages as read");
    }
  };
}

export const messageService = new MessageService();
