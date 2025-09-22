import { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { ContactSidebar } from "./components/ContactSidebar";
import { ChatWindow } from "./components/ChatWindow";
import { LoginScreen } from "./components/LoginScreen";
import type { Message, Contact } from "./types";
import axios from "axios";
import { io } from "socket.io-client";

// Backend URL
const BACKEND_URL = "https://g-connect-back-6.onrender.com";

// Connect to backend Socket.IO
const socket = io(BACKEND_URL, { transports: ["websocket"] });

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeContactId, setActiveContactId] = useState<string | undefined>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [mobileView, setMobileView] = useState<'sidebar' | 'chat'>('sidebar');
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Fetch contacts from backend after login
  useEffect(() => {
    if (currentUser) {
      axios.get(`${BACKEND_URL}/contacts/${currentUser}`)
        .then(res => setContacts(res.data))
        .catch(() => setContacts([]));

      socket.emit("join", currentUser);
    }
  }, [currentUser]);

  const activeContact = contacts.find(contact => contact.id === activeContactId);
  const currentMessages = activeContactId ? messages[activeContactId] || [] : [];

  const handleLogin = useCallback((username: string) => {
    setCurrentUser(username);
  }, []);

  const handleContactSelect = useCallback((contactId: string) => {
    setActiveContactId(contactId);

    if (currentUser) {
      axios.get(`${BACKEND_URL}/messages/${currentUser}/${contactId}`)
        .then(res => {
          setMessages(prev => ({
            ...prev,
            [contactId]: res.data.map((msg: any) => ({
              id: msg._id,
              text: msg.text,
              timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isSent: msg.sender === currentUser,
              isDelivered: msg.sender === currentUser,
              isRead: msg.sender === currentUser,
            }))
          }));
        });
    }

    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, unreadCount: 0 } : c));
    if (isMobile) setMobileView('chat');
  }, [currentUser, isMobile]);

  const handleStartNewChat = useCallback((username: string) => {
    const existingContact = contacts.find(c => c.name.toLowerCase() === username.toLowerCase());
    if (existingContact) {
      handleContactSelect(existingContact.id);
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: username,
      avatar: '',
      lastMessage: 'Started a conversation',
      timestamp: 'now',
      isOnline: true,
    };
    setContacts(prev => [...prev, newContact]);
    setMessages(prev => ({ ...prev, [newContact.id]: [] }));
    handleContactSelect(newContact.id);
  }, [contacts, handleContactSelect]);

  const handleBackToSidebar = useCallback(() => setMobileView('sidebar'), []);

  const handleSendMessage = useCallback((messageText: string) => {
    if (!activeContactId || !currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
      isDelivered: true,
    };

    socket.emit("sendMessage", {
      sender: currentUser,
      receiver: activeContactId,
      text: messageText,
    });

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage],
    }));

    setContacts(prev => prev.map(c => c.id === activeContactId ? { ...c, lastMessage: messageText, timestamp: 'now' } : c));
  }, [activeContactId, currentUser]);

  // Receive messages
  useEffect(() => {
    socket.on("receiveMessage", (msg: any) => {
      if (!contacts.find(c => c.id === msg.sender)) {
        const newContact: Contact = {
          id: msg.sender,
          name: msg.sender,
          avatar: '',
          lastMessage: msg.text,
          timestamp: 'now',
          isOnline: true,
        };
        setContacts(prev => [...prev, newContact]);
      }

      setMessages(prev => ({
        ...prev,
        [msg.sender]: [...(prev[msg.sender] || []), {
          id: Date.now().toString(),
          text: msg.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSent: false,
        }]
      }));
    });

    return () => socket.off("receiveMessage");
  }, [contacts]);

  if (!currentUser) return <LoginScreen onLogin={handleLogin} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-blue-900 to-blue-950 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-10 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full"
          animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400/20 rounded-full"
          animate={{ y: [0, -120, 0], x: [0, 20, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400/20 rounded-full"
          animate={{ y: [0, -80, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 4 }} />
      </div>

      <div className="md:flex md:h-full w-full h-full relative">
        <div className="md:hidden h-full w-full relative overflow-hidden">
          <motion.div initial={false} animate={{ x: mobileView === 'sidebar' ? 0 : '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }} className="absolute inset-0 w-full h-full">
            <ContactSidebar
              contacts={contacts}
              activeContactId={activeContactId}
              onContactSelect={handleContactSelect}
              onStartNewChat={handleStartNewChat}
              currentUser={currentUser} />
          </motion.div>

          <motion.div initial={false} animate={{ x: mobileView === 'chat' ? 0 : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }} className="absolute inset-0 w-full h-full">
            <ChatWindow
              contact={activeContact}
              messages={currentMessages}
              onSendMessage={handleSendMessage}
              onBack={handleBackToSidebar}
              isMobile={true} />
          </motion.div>
        </div>

        <div className="hidden md:flex w-full h-full">
          <ContactSidebar
            contacts={contacts}
            activeContactId={activeContactId}
            onContactSelect={handleContactSelect}
            onStartNewChat={handleStartNewChat}
            currentUser={currentUser} />
          <ChatWindow
            contact={activeContact}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            onBack={handleBackToSidebar}
            isMobile={false} />
        </div>
      </div>
    </motion.div>
  );
}
