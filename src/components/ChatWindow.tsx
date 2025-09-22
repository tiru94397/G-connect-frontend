import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import { ScrollArea } from "./ui/scroll-area";
import { Waves, MessageCircle, Fish, Anchor } from "lucide-react";
import type { Message, Contact } from "../types";

interface ChatWindowProps {
  contact?: Contact;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onBack?: () => void;
  isMobile?: boolean;
}

export function ChatWindow({ contact, messages, onSendMessage, onBack, isMobile = false }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-card/60 backdrop-blur-lg relative overflow-hidden">
      {/* Background ocean elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-16 right-4 md:top-20 md:right-20 w-12 h-12 md:w-16 md:h-16 text-blue-900/30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Fish className="w-full h-full" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-4 md:bottom-32 md:left-20 w-10 h-10 md:w-12 md:h-12 text-blue-800/30"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Anchor className="w-full h-full" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-2 md:left-10 w-16 h-16 md:w-20 md:h-20 text-blue-900/25"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Waves className="w-full h-full" />
        </motion.div>
      </div>

      <ChatHeader contact={contact} onBack={onBack} isMobile={isMobile} />
      
      {contact ? (
        <>
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-2 md:p-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              {messages.map((message, index) => (
                <MessageBubble key={message.id} message={message} index={index} />
              ))}
              <div ref={messagesEndRef} />
            </motion.div>
          </ScrollArea>

          {/* Input Area */}
          <ChatInput onSendMessage={onSendMessage} />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center bg-gradient-to-br from-cyan-50/50 to-teal-50/50 relative z-10"
        >
          <div className="text-center max-w-md">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative mb-8"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-blue-800" />
                  </motion.div>
                </motion.div>
                
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl font-medium mb-4 bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
                Welcome to G-Connect
              </h2>
              <p className="text-blue-700/80 mb-2 font-medium">
                "Ocyanic"
              </p>
              <p className="text-muted-foreground max-w-md leading-relaxed text-sm md:text-base px-4 md:px-0">
                Dive into seamless conversations across the digital ocean. 
                Select a chat to start messaging or create a new conversation 
                by clicking the + button.
              </p>
            </motion.div>

            {/* Floating elements around welcome message */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-10 -left-10 w-8 h-8 text-cyan-300"
            >
              <Fish className="w-full h-full" />
            </motion.div>
            
            <motion.div
              animate={{
                y: [0, 10, 0],
                x: [0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-10 -right-10 w-6 h-6 text-teal-300"
            >
              <Waves className="w-full h-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}