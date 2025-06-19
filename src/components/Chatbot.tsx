import React, { useState, useRef, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'
import UploadedFile from './UploadedFile'
import { BarChart, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: string
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Farm to Plate SCM Engine, your AI supply chain assistant. I can help you with supply chain optimization, demand forecasting, inventory management, and logistics planning. Upload an Excel or CSV file for demand forecasting analysis, or ask me any supply chain questions!",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    {
      Icon: BarChart,
      text: 'What is the average lead time for products with low availability?',
    },
    {
      Icon: TrendingUp,
      text: 'Which products have the highest turnover rates and am I at risk of stockouts for any of these SKUs?',
    },
    // …add more here
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const generateSupplyChainResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase()
    // … your existing response logic …
    return "That's an interesting supply chain question! …"
  }

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsProcessingFile(true)
    setTimeout(() => {
      setIsProcessingFile(false)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `File "${file.name}" has been uploaded successfully! I can now analyze your data for demand forecasting.`,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
    }, 2000)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setIsProcessingFile(false)
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: 'File removed. You can upload a new file or continue chatting.',
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
  }

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateSupplyChainResponse(messageText),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
        {uploadedFile && (
          <UploadedFile
            file={uploadedFile}
            onRemove={handleRemoveFile}
            processing={isProcessingFile}
          />
        )}

        {messages.map((msg, idx) => (
          <React.Fragment key={msg.id}>
            <ChatMessage
              message={msg.text}
              isBot={msg.isBot}
              timestamp={msg.timestamp}
            />

            {idx === 0 && (
              <>
                <p className="text-lg text-white mb-2 ml-5">
                  Here are some sample questions that you can start with
                </p>
                <div className="flex gap-4 overflow-x-auto p-4">
                  {suggestions.map(({ Icon, text }) => (
                    <Card
                      key={text}
                      onClick={() => handleSendMessage(text)}
                      className="flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow border-none"
                    >
                      <CardContent className="flex items-center space-x-2 p-3 bg-gray-700">
                        <Icon className="w-6 h-6 text-blue-400" />
                        <span className="text-sm text-gray-100">{text}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}


          </React.Fragment>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        disabled={isTyping}
      />
    </div>
  )
}

export default Chatbot
