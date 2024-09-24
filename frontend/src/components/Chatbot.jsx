// src/components/Chatbot.jsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm CommunityCare AI, here to support you. How can I assist you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus the input field on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again later.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-fadeIn`}
          >
            {msg.sender === 'bot' && (
              <img
                src="/bot-avatar.png" // Ensure this image exists in the public folder
                alt="Bot Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-xs ${
                msg.sender === 'bot'
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-green-200 text-green-800'
              }`}
            >
              <strong>{msg.sender === 'bot' ? 'CommunityCare AI' : 'You'}:</strong> {msg.text}
            </div>
            {msg.sender === 'user' && (
              <img
                src="/user-avatar.png" // Ensure this image exists in the public folder
                alt="User Avatar"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="mb-4 flex justify-start animate-fadeIn">
            <img
              src="/bot-avatar.png" // Ensure this image exists in the public folder
              alt="Bot Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="rounded-lg px-4 py-2 bg-blue-200 text-blue-800 flex items-center">
              <span className="mr-2">CommunityCare AI:</span>
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-blue-800 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-800 rounded-full animate-bounce delay-200"></span>
                <span className="w-2 h-2 bg-blue-800 rounded-full animate-bounce delay-400"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex p-4 bg-white dark:bg-gray-700 rounded-b-lg shadow-md">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
          placeholder="Type your message..."
          aria-label="Type your message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
