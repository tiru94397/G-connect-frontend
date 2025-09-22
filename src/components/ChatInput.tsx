import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Paperclip, Smile, Mic, Waves } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    setIsTyping(true);
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-4 bg-card/80 backdrop-blur-lg border-t border-border/50 relative overflow-hidden"
    >
      {/* Background wave animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-600/5 to-blue-500/5"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <form onSubmit={handleSubmit} className="flex items-center gap-3 relative z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-accent/50 text-muted-foreground hover:text-blue-600 transition-colors"
            disabled={disabled}
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
        </motion.div>
        
        <div className="flex-1 relative">
          <motion.div
            animate={isTyping ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-12 bg-input-background/80 backdrop-blur-sm border-border/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
              disabled={disabled}
            />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent/50 text-muted-foreground hover:text-yellow-500 transition-colors"
              disabled={disabled}
              aria-label="Add emoji"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {message.trim() ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 shadow-lg relative overflow-hidden"
              disabled={disabled}
              aria-label="Send message"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <Send className="w-4 h-4 relative z-10" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-accent/50 text-muted-foreground hover:text-cyan-600 transition-colors"
              disabled={disabled}
              aria-label="Voice message"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Mic className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </form>

      {/* Typing indicator animation */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full left-4 mb-2"
        >
          <div className="flex space-x-1 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}