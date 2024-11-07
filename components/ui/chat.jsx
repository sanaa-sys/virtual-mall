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
  const [answer, setAnswer] = useState("loading");

  async function generateAnswer(question) {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY", // Use your API Key here
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }], // Send question to API
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
      setMessages([...messages, { text: input, sender: "user" }]);

      // Call generateAnswer to get a response from the API
      const botResponse = await generateAnswer(input);

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);

      setInput(""); // Reset input field after sending
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-black text-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
            <h3 className="font-semibold">Customer Support</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5 text-white" />{" "}
              {/* Increase icon size and set color */}
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
                className="bg-gray-800 text-white"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gray-800 text-white"
              >
                <Send className="h-5 w-5" />{" "}
                {/* Increase icon size and set color */}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="rounded-full h-16 w-16 bg-black text-white flex items-center justify-center" // Larger button with black bg
        >
          <MessageCircle className="h-8 w-8 text-white" />{" "}
          {/* Increase icon size and set color */}
        </Button>
      )}
    </div>
  );
}
