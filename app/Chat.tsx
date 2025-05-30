import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { useSocket } from "./SP";


const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const inputRef = useRef<any>();
  const btnRef = useRef<any>();
  const Socket = useSocket();

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessages = [...messages, { text: newMessage, sender: "me" }];
      setMessages(newMessages);
      setNewMessage("");

      const peer = Socket.peerState;
      if (peer) {
        const messageData = {
          type: "messages",
          text: newMessage,
          sender: "other",
        };
        peer.send(JSON.stringify(messageData));
      }
    }
  };

  useEffect(() => {
    const peer = Socket.peerState;

    if (peer) {
      peer.on("data", (data: any) => {
        const receivedMessage = JSON.parse(data);
        if (receivedMessage.text) {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      });
    }
  }, [Socket.peerState]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current.focus();
      } else if (e.key === "Enter") {
        btnRef.current.click();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {Socket.peerState ? (
        <div className="flex justify-center sm:w-fit w-full z-10">
          <div className="flex flex-col flex-wrap border rounded-md sm:min-w-[400px] min-w-[95%] min-h-[400px] p-2">
            {}
            <div className="flex-1 overflow-y-auto w-full">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "me" ? "justify-end" : "justify-start"
                  } mb-[2px]`}
                >
                  <div
                    className={`flex flex-wrap sm:max-w-[200px] max-w-[150px] text-sm rounded-3xl px-3 py-1 ${
                      message.sender === "me"
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-700  text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {}
            <div className="flex justify-between bottom-1 w-full space-x-1">
              <div className="flex w-full">
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  ref={inputRef}
                  placeholder={`Send a message`}
                />
              </div>
              <div className="">
                <Button
                  className="p-3"
                  onClick={handleSendMessage}
                  ref={btnRef}
                >
                  <SendHorizonal size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Chat;
