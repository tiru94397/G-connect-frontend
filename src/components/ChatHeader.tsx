import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Video, Phone, Search, MoreVertical, Waves, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import type { Contact } from "../types";

interface ChatHeaderProps {
  contact?: Contact;
  onBack?: () => void;
  isMobile?: boolean;
}

export function ChatHeader({ contact, onBack, isMobile = false }: ChatHeaderProps) {
  if (!contact) {
    return (
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="p-4 bg-card/80 backdrop-blur-lg border-b border-border/50 relative overflow-hidden"
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="h-12 flex items-center justify-center text-muted-foreground relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center"
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
              className="w-8 h-8 mx-auto mb-2 text-blue-400"
            >
              <Waves />
            </motion.div>
            <p>Select a chat to start messaging</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-4 bg-card/80 backdrop-blur-lg border-b border-border/50 relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="flex items-center justify-between relative z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-3"
        >
          {/* Back Button for Mobile */}
          {isMobile && onBack && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 hover:bg-accent/50 text-card-foreground"
                aria-label="Back to contacts"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="w-12 h-12 ring-2 ring-blue-200/50">
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
                  {contact.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            {contact.isOnline && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-card shadow-lg"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full bg-green-400 rounded-full"
                />
              </motion.div>
            )}
          </div>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h3 className="font-medium text-card-foreground">{contact.name}</h3>
            <motion.p
              animate={{
                opacity: contact.isOnline ? [0.7, 1, 0.7] : 0.6,
              }}
              transition={{
                duration: 2,
                repeat: contact.isOnline ? Infinity : 0,
                ease: "easeInOut"
              }}
              className="text-sm text-muted-foreground"
            >
              {contact.isOnline ? 'Online' : `Last seen ${contact.timestamp}`}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center gap-2"
        >
          {[
            { icon: Video, color: "hover:text-blue-500", label: "Video call" },
            { icon: Phone, color: "hover:text-green-500", label: "Voice call" },
            { icon: Search, color: "hover:text-yellow-500", label: "Search" },
            { icon: MoreVertical, color: "hover:text-blue-500", label: "More options" }
          ].map(({ icon: Icon, color, label }, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 hover:bg-accent/50 transition-colors ${color}`}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}