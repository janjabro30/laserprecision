'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/lib/types';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hei! Jeg er her for å hjelpe deg. Spør meg om ordresporing, spesialbestillinger eller produkter.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let responseContent = 'Takk for meldingen din. ';
      
      if (inputValue.toLowerCase().includes('ordre') || inputValue.toLowerCase().includes('spor')) {
        responseContent += 'For å spore ordren din, gå til "Spor Min Ordre" siden og skriv inn ordrenummeret eller e-postadressen din.';
      } else if (inputValue.toLowerCase().includes('spesial') || inputValue.toLowerCase().includes('bestilling')) {
        responseContent += 'Du kan lage en spesialbestilling på "Spesialbestilling" siden. Der kan du laste opp bilder og velge materialer.';
      } else if (inputValue.toLowerCase().includes('pris')) {
        responseContent += 'Prisene våre varierer avhengig av produkt og tilpasninger. Besøk produktsiden for å se priser.';
      } else if (inputValue.toLowerCase().includes('levering')) {
        responseContent += 'Vi leverer vanligvis innen 5-7 virkedager. For spesialbestillinger kan det ta 10-14 dager.';
      } else {
        responseContent += 'Kan jeg hjelpe deg med noe annet? Spør gjerne om produkter, priser, levering eller ordresporing.';
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);

    setInputValue('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          )}
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl z-50 flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Laser Presisjon Chat</h3>
            <p className="text-sm text-blue-100">Vi er her for å hjelpe!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Skriv en melding..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
