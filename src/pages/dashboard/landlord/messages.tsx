import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { IConversation } from "@/interfaces/message.interface";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { useChat, useChatWindow } from "@/hooks/useChat";
import socket from "@/lib/socket";

export default function LandlordMessages() {
  const [searchParams] = useSearchParams();

  const { conversations, isLoading, isError } = useChat();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex max-h-[88vh] border rounded-md overflow-hidden">
      <ChatSidebar conversations={conversations || []} />
      <ChatWindow conversationId={searchParams.get("conversationId") || ""} />
    </div>
  );
}
function ChatSidebar({ conversations }: { conversations: IConversation[] }) {
  const [_, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();

  function getOtherParticipantName(conversation: IConversation) {
    if (!user) return "";
    const otherParticipant = conversation.participants.filter(
      (p) => p._id !== user?._id,
    )[0];

    return otherParticipant?.firstName;
  }

  return (
    <div className="w-1/3 max-w-sm border-r bg-muted">
      <div className="p-4 border-b">
        <Input placeholder="Search tenants..." />
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-2 p-2 text-left">
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() =>
                setSearchParams({ conversationId: conversation._id })
              }
              className="p-3 rounded-md hover:bg-muted-foreground/10 cursor-pointer"
            >
              <p className="font-medium">
                {getOtherParticipantName(conversation)}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {conversation.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function ChatWindow({ conversationId }: { conversationId: string | null }) {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<{ message: string }>();

  const { user } = useAuthStore();
  const {
    messages,
    sendMessage,
    conversation,
    isLoading,
    isError,
    isTyping,
    setIsTyping,
  } = useChatWindow(conversationId as string, user?._id as string);

  function getOtherParticipant(conversation: IConversation | undefined | null) {
    if (!user) return "";
    if (!conversation) return "";
    const otherParticipant = conversation.participants.filter(
      (p) => p._id !== user?._id,
    )[0];

    return otherParticipant;
  }

  const onSubmit = async (payload: { message: string }) => {
    console.log({ payload });
    const otherParticipant = getOtherParticipant(conversation as IConversation);
    if (!otherParticipant) return;
    sendMessage(payload.message, otherParticipant._id);
    socket.emit("send_typing_status", {
      isTyping: false,
      recipientId: otherParticipant._id,
    });
    reset();
  };

  function getOtherParticipantName(conversation: IConversation | undefined) {
    if (!user) return "";
    if (!conversation) return "";
    const otherParticipant = conversation.participants.filter(
      (p) => p._id !== user?._id,
    )[0];

    return otherParticipant?.firstName + " " + otherParticipant?.lastName;
  }

  const handleIsTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const otherParticipant = getOtherParticipant(conversation as IConversation);
    if (!otherParticipant) return;

    // console.log(event.target.value);

    if (!event.target.value) {
      socket.emit("send_typing_status", {
        isTyping: false,
        recipientId: otherParticipant._id,
      });
      return;
    }

    socket.emit("send_typing_status", {
      isTyping: true,
      recipientId: otherParticipant._id,
    });
  };

  if (!conversationId) return <div>No conversation selected</div>;

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    <div className="w-full flex flex-col justify-between relative">
      {/* Header */}
      <div className="p-4 border-b bg-background shadow-sm text-left">
        <h2 className="font-semibold">
          {getOtherParticipantName(conversation as IConversation)}
        </h2>
        <p className="text-sm text-muted-foreground">Online</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/80">
        {messages.length > 0 &&
          messages?.map((message) => {
            return (
              <ChatBubble
                key={message._id}
                text={message.content}
                isSender={message.sender._id === user?._id}
              />
            );
          })}
        {isTyping && <p>Typing...</p>}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border-t bg-background flex items-center gap-2"
      >
        <Input
          {...register("message", {
            required: "Message is required",
            onChange: handleIsTyping,
          })}
          name="message"
          placeholder="Type a message..."
        />
        <Button className="btn-primary">Send</Button>
      </form>
    </div>
  );
}

function ChatBubble({ text, isSender }: { text: string; isSender: boolean }) {
  return (
    <div
      className={`max-w-xs md:max-w-sm px-4 py-2 rounded-xl text-sm w-fit ${
        isSender
          ? "bg-custom-primary text-white border ml-auto"
          : "bg-white text-custom-primary mr-auto"
      }`}
    >
      {text}
    </div>
  );
}
