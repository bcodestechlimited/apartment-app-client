// src/interfaces/message.interface.ts

import type { IUser } from "./user.interface";

export interface IMessage {
  _id: string;
  conversationId: string;
  sender: IUser;
  receiver: IUser;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConversation {
  _id: string;
  participants: IUser[]; // user IDs
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
}
