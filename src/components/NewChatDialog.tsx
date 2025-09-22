import { useState } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserPlus, Search, Waves } from "lucide-react";

interface NewChatDialogProps {
  onStartChat: (username: string) => void;
  children: React.ReactNode;
}

export function NewChatDialog({ onStartChat, children }: NewChatDialogProps) {
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onStartChat(username.trim());
      setUsername("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md backdrop-blur-lg bg-white/90 border-cyan-200/50">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl text-cyan-900">Start New Chat</DialogTitle>
              <DialogDescription className="text-cyan-700">
                Enter a username to start chatting
              </DialogDescription>
            </div>
          </motion.div>
        </DialogHeader>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="new-username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="new-username"
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-white/70 border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400"
                autoFocus
              />
            </div>
          </div>

          {username.trim() && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="p-3 bg-cyan-50 rounded-lg border border-cyan-200"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-400 text-white">
                    {username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-cyan-900">@{username}</p>
                  <p className="text-sm text-cyan-600">Start a conversation</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-cyan-200 text-cyan-700 hover:bg-cyan-50"
            >
              Cancel
            </Button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                disabled={!username.trim()}
              >
                <Waves className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </motion.div>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}