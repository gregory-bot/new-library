import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prevMessages => [...prevMessages, { text: input, isBot: false }]);
    setInput('');
    setTimeout(() => {
      if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'hi😁 How can I help you today?😊', isBot: true },
        ]);
      } else if (/book|borrow|search|title|find/i.test(input)) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Hi user, check the books we have in our library as we get to solve your issue. Feel free to contact us. Thank you and welcome to our library!", isBot: true },
        ]);
      } else if (/i need a book|looking for a book|book called/i.test(input)) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Sure! Check our library for your requested book. We're happy to assist with finding it!", isBot: true },
        ]);
      } else {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "I'm sorry, I didn't quite get that. Can you please rephrase?", isBot: true },
        ]);
      }
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <div 
        ref={chatWindowRef}
        className={`fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl transform transition-all duration-300 z-50 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-xl text-indigo-600">library chat</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex justify-center text-gray-500">
              <p className="italic">Start by greeting to begin the conversation...</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-indigo-600 text-white'}`}>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
