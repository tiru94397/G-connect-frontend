import { Check, CheckCheck } from "lucide-react";
import { motion } from "motion/react";
import type { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
  index?: number;
}

export function MessageBubble({ message, index = 0 }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className={`flex mb-4 ${message.isSent ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative overflow-hidden ${
          message.isSent
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-sm shadow-lg'
            : 'bg-card/80 backdrop-blur-sm text-card-foreground rounded-bl-sm shadow-md border border-border/50'
        }`}
      >
        {/* Animated background for sent messages */}
        {message.isSent && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        )}
        
        <p className="text-sm relative z-10">{message.text}</p>
        <div className={`flex items-center justify-end gap-1 mt-2 relative z-10 ${
          message.isSent ? 'text-blue-100' : 'text-muted-foreground'
        }`}>
          <span className="text-xs">{message.timestamp}</span>
          {message.isSent && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex"
            >
              {message.isRead ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CheckCheck className="w-4 h-4 text-blue-200" />
                </motion.div>
              ) : message.isDelivered ? (
                <motion.div
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCheck className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Bubble tail effect */}
        <div className={`absolute bottom-0 ${
          message.isSent ? 'right-0' : 'left-0'
        } w-0 h-0 border-8 ${
          message.isSent
            ? 'border-l-transparent border-r-blue-500 border-t-transparent border-b-transparent'
            : 'border-r-transparent border-l-card border-t-transparent border-b-transparent'
        }`} />
      </motion.div>
    </motion.div>
  );
}