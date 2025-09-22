import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, MessageCircle, Menu, Plus, Waves } from "lucide-react";
import { NewChatDialog } from "./NewChatDialog";
import { motion } from "motion/react";
import type { Contact } from "../types";

interface ContactSidebarProps {
  contacts: Contact[];
  activeContactId?: string;
  onContactSelect: (contactId: string) => void;
  onStartNewChat: (username: string) => void;
  currentUser: string;
}

export function ContactSidebar({ contacts, activeContactId, onContactSelect, onStartNewChat, currentUser }: ContactSidebarProps) {
  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full md:w-80 lg:w-96 bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border flex flex-col h-full relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-10 w-40 h-40 bg-gradient-to-tl from-blue-900/25 to-blue-800/25 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Header */}
      <div className="p-4 bg-sidebar-accent/40 border-b border-sidebar-border relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-800 to-blue-900 rounded-full flex items-center justify-center"
            >
              <Waves className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </motion.div>
            <div>
              <h2 className="text-base md:text-lg font-medium text-sidebar-foreground">G-Connect</h2>
              <p className="text-xs text-sidebar-foreground/70">@{currentUser}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-sidebar-accent text-sidebar-foreground"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Search */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="relative mb-4"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations..."
            className="pl-10 bg-input-background/70 backdrop-blur-sm border-sidebar-border focus:border-blue-400 focus:ring-blue-400/20"
          />
        </motion.div>

        {/* Prominent Add New Chat Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <NewChatDialog onStartChat={onStartNewChat}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button 
                className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white shadow-xl border-0 text-sm md:text-base"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Start New Conversation
              </Button>
            </motion.div>
          </NewChatDialog>
        </motion.div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto relative z-10">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className={`p-3 cursor-pointer border-b border-sidebar-border/50 transition-all duration-200 relative ${
              activeContactId === contact.id 
                ? 'bg-sidebar-accent shadow-md' 
                : 'hover:bg-sidebar-accent/50'
            }`}
            onClick={() => onContactSelect(contact.id)}
            role="button"
            tabIndex={0}
            aria-label={`Chat with ${contact.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onContactSelect(contact.id);
              }
            }}
          >
            {activeContactId === contact.id && (
              <motion.div
                layoutId="activeChat"
                className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-500/10 rounded-lg"
                transition={{ duration: 0.3 }}
              />
            )}
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="w-10 h-10 md:w-12 md:h-12 ring-2 ring-blue-800/60">
                    <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-900 text-white">
                      {contact.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                {contact.isOnline && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-sidebar ring-1 ring-green-300/50"
                  />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate text-sidebar-foreground">{contact.name}</h3>
                  <span className="text-xs text-sidebar-foreground/60">{contact.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-sidebar-foreground/70 truncate flex-1">{contact.lastMessage}</p>
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Badge className="ml-2 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white min-w-[18px] h-5 text-xs border-0 shadow-lg">
                        {contact.unreadCount > 9 ? '9+' : contact.unreadCount}
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {contacts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-col items-center justify-center h-64 text-center p-6"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-full flex items-center justify-center mb-4"
            >
              <MessageCircle className="w-8 h-8 text-blue-300" />
            </motion.div>
            <p className="text-sidebar-foreground/60 mb-2">No conversations yet</p>
            <p className="text-sm text-sidebar-foreground/40">Start chatting by clicking the button above</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}