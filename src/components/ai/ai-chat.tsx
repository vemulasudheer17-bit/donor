"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    X,
    Send,
    Bot,
    User,
    Minimize2,
    Maximize2,
    Sparkles,
} from "lucide-react";
import { Button, Card, Input, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const suggestedQuestions = [
    "How do I list my vehicle?",
    "What financing options are available?",
    "How does verification work?",
    "How to contact a seller?",
];

const aiResponses: Record<string, string> = {
    "how do i list my vehicle":
        "Listing your vehicle is easy! Just click 'Sell Vehicle' in the navigation, fill in your vehicle details, upload photos, set your price, and publish. Our AI will suggest competitive pricing based on market data.",
    "what financing options are available":
        "We partner with top banks like HDFC, ICICI, SBI, and Axis Bank. Interest rates start from 8.25% p.a. with tenures up to 84 months. You can calculate EMI and apply directly from the Finance page.",
    "how does verification work":
        "Our verification process includes: 1) Seller ID verification, 2) Vehicle document check (RC, Insurance), 3) Physical inspection by our team. Verified listings get a special badge and higher visibility.",
    "how to contact a seller":
        "On any vehicle listing, click 'Contact Seller' to call or 'Chat Now' to message. You can also save vehicles and contact sellers later from your dashboard.",
};

export function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content:
                "Hi! 👋 I'm your RideGrow AI assistant. I can help you with buying, selling, or financing vehicles. What would you like to know?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        for (const [key, response] of Object.entries(aiResponses)) {
            if (lowerMessage.includes(key) || key.split(" ").some(word => lowerMessage.includes(word))) {
                return response;
            }
        }

        if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
            return "Prices vary based on vehicle type, year, and condition. Use our search filters to find vehicles in your budget, or check the Finance page for EMI options.";
        }

        if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
            return "Hello! 👋 How can I help you today? I can assist with vehicle listings, financing, buying process, and more!";
        }

        if (lowerMessage.includes("status") || lowerMessage.includes("system")) {
            return "All systems are fully operational. I'm ready to assist you with vehicle queries, financing, and more.";
        }

        if (lowerMessage.includes("working") || lowerMessage.includes("real")) {
            return "Yes, I am fully active and working! I process your requests in real-time to provide the best assistance.";
        }

        return "I'd be happy to help! Could you provide more details about your question? You can ask about buying vehicles, selling, financing options, or how our platform works.";
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const response = generateResponse(input);
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleSuggestionClick = (question: string) => {
        setInput(question);
        sendMessage();
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 w-16 h-16 rounded-full gradient-primary shadow-2xl flex items-center justify-center z-50 transition-opacity",
                    isOpen && "opacity-0 pointer-events-none"
                )}
            >
                <MessageCircle className="w-7 h-7 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-[hsl(var(--secondary-foreground))]" />
                </span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed bottom-6 right-6 z-50 shadow-2xl rounded-2xl overflow-hidden border border-[hsl(var(--border))]",
                            isMinimized ? "w-80" : "w-96 h-[600px]"
                        )}
                    >
                        {/* Header */}
                        <div className="gradient-primary p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">AI Assistant</h3>
                                    <p className="text-xs text-white/80">Always here to help</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    {isMinimized ? (
                                        <Maximize2 className="w-4 h-4" />
                                    ) : (
                                        <Minimize2 className="w-4 h-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 h-[440px] overflow-y-auto p-4 bg-[hsl(var(--background))]">
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={cn(
                                                "flex gap-3 mb-4",
                                                message.role === "user" && "flex-row-reverse"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                                    message.role === "assistant"
                                                        ? "gradient-primary"
                                                        : "bg-[hsl(var(--muted))]"
                                                )}
                                            >
                                                {message.role === "assistant" ? (
                                                    <Bot className="w-4 h-4 text-white" />
                                                ) : (
                                                    <User className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div
                                                className={cn(
                                                    "max-w-[75%] rounded-2xl px-4 py-3",
                                                    message.role === "assistant"
                                                        ? "bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
                                                        : "bg-[hsl(var(--primary))] text-white"
                                                )}
                                            >
                                                <p className="text-sm leading-relaxed">{message.content}</p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl px-4 py-3">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-[hsl(var(--muted-foreground))] rounded-full animate-bounce" />
                                                    <span className="w-2 h-2 bg-[hsl(var(--muted-foreground))] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                                    <span className="w-2 h-2 bg-[hsl(var(--muted-foreground))] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Suggested Questions */}
                                    {messages.length === 1 && (
                                        <div className="mt-4">
                                            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">
                                                Quick questions:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {suggestedQuestions.map((q) => (
                                                    <button
                                                        key={q}
                                                        onClick={() => {
                                                            setInput(q);
                                                            setTimeout(() => sendMessage(), 100);
                                                        }}
                                                        className="text-xs px-3 py-1.5 bg-[hsl(var(--muted))] rounded-full hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))] transition-colors"
                                                    >
                                                        {q}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            sendMessage();
                                        }}
                                        className="flex gap-2"
                                    >
                                        <Input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1"
                                        />
                                        <Button type="submit" size="icon" disabled={!input.trim()}>
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
