"use client";
import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Input } from "@mui/material";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I assist you with your shopping today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const formatMessageContent = (text) => {
    return text.replace(/([.!?])\s*(?=[A-Z])/g, "$1\n\n"); // Add line breaks after sentences
  };

  async function generateAnswer(question) {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyATGXWqRERgnmJp_EZsB22MAnv0SgspzMg",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I couldn't process your request.";
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const formattedMessage = formatMessageContent(input);
      setMessages([...messages, { text: formattedMessage, sender: "user" }]);

      const botResponse = await generateAnswer(formattedMessage);

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);

      setInput(""); // Reset input field after sending
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-gradient-to-r from-blue-200 to-purple-300 rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="p-4 bg-indigo-100 text-black flex justify-between items-center">
            <h3 className="font-semibold">Customer Support</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5 text-black" />{" "}
              {/* Black icon on white background */}
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-indigo-100 text-black"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-indigo-100 text-black"
              >
                <Send className="h-5 w-5" />{" "}
                {/* White icon on dark background */}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="rounded-full h-16 w-16 bg-black text-white flex items-center justify-center" // Black button with white icon when closed
        >
          <MessageCircle className="h-8 w-8 text-white" /> {/* White icon */}
        </Button>
      )}
    </div>
  );
}
