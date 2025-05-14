"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { CircleStop, Mic, MicOff, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// GenAi
import { GoogleGenAI } from "@google/genai";

// Type Writter
import { Typewriter } from 'react-simple-typewriter';

// Markdown
import ReactMarkdown from 'react-markdown';

// Axios
import axios from "axios"

// AppAsset
import AppAsset from "@/core/AppAsset"
import MarkdownTypingEffect from "@/components/markdown-typing-effect"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
}

// Declare SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export default function Main() {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY });

  const example_text = ''

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const recognitionRef = useRef<any | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("")

        setInput(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsRecording(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.")
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
    } else {
      setInput("")
      recognitionRef.current.start()
    }

    setIsRecording(!isRecording)
  }

  const handleGeminiApi = async (message: string) => {
    try {
      return await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: message,
      })
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
    }

    const result = await handleGeminiApi(userMessage.content);
    const response = result?.candidates?.[0]?.content?.parts?.[0].text ?? "No response available";
    // const response = result?.data?.candidates[0].content.parts[0];
    // console.log(response)

    console.log(response);
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // In a real app, you would call an API here
    // Simulating API call with timeout
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div
      className="flex flex-col h-screen max-w-3xl mx-auto p-4 pt-24">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {
          messages.map((message) => (
            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <Card
                className={cn(
                  "max-w-[80%] p-3",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                )}>
                {
                  message.role === "assistant" ? (
                    < MarkdownTypingEffect
                      markdown={message.content} />
                  ) : <>
                    {message.content}
                  </>
                }
              </Card>
            </div>
          ))}
        {
          isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-3 bg-muted">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </Card>
            </div>
          )
        }
        <div
          ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-2 border rounded-lg p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 outline-none bg-transparent" />
        <Button
          type="button"
          size="icon"
          variant={isRecording ? "destructive" : "outline"}
          onClick={toggleRecording}
          className="rounded-full">
          {
            isRecording ?
              <MicOff size={18} /> :
              <Mic size={18} />
          }
        </Button>

        <Button
          type="submit"
          size="icon"
          variant="default"
          className="rounded-full"
          disabled={input.length == 0}>
          {
            isLoading ?
              <CircleStop size={30} /> :
              <Send size={18} />
          }
        </Button>
      </form>
    </div>
  )
}
