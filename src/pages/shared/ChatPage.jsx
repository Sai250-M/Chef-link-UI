import React, { useState, useRef, useEffect } from "react";
import {
  Box, Typography, Avatar, TextField, IconButton, Stack,
  Paper, Chip, Divider, InputAdornment, alpha, Badge,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DescriptionIcon from "@mui/icons-material/Description";
import { BRAND, glassDark, premiumGradient } from "../../theme";

const CONVERSATIONS = [
  {
    id: 1, name: "Taj Hotel HR", role: "Restaurant Owner", avatar: "TH",
    lastMsg: "Can you come for a trial this Saturday?", time: "2m ago", unread: 3, online: true,
    color: "#10B981",
  },
  {
    id: 2, name: "Priya Nair", role: "Head Chef", avatar: "PN",
    lastMsg: "I've attached my updated portfolio", time: "15m ago", unread: 1, online: true,
    color: BRAND.orange,
  },
  {
    id: 3, name: "WeddingsBySunita", role: "Event Organizer", avatar: "WS",
    lastMsg: "The event is on Dec 28th, 200 guests", time: "1h ago", unread: 0, online: false,
    color: "#3B82F6",
  },
  {
    id: 4, name: "Le Meridien", role: "Restaurant Owner", avatar: "LM",
    lastMsg: "Your application has been shortlisted", time: "3h ago", unread: 0, online: false,
    color: BRAND.gold,
  },
  {
    id: 5, name: "Ravi Sharma", role: "Executive Chef", avatar: "RS",
    lastMsg: "Thank you for the opportunity!", time: "Yesterday", unread: 0, online: false,
    color: "#8B5CF6",
  },
];

const MESSAGES = {
  1: [
    { id: 1, sender: "them", text: "Hello! We reviewed your profile and were very impressed by your experience.", time: "10:20 AM", read: true },
    { id: 2, sender: "me", text: "Thank you so much! I'm very excited about the opportunity at Taj Hotel.", time: "10:22 AM", read: true },
    { id: 3, sender: "them", text: "We'd love to schedule a trial run in our kitchen. Are you available this Saturday?", time: "10:24 AM", read: true },
    { id: 4, sender: "me", text: "Absolutely! Saturday works perfectly for me. What time would you prefer?", time: "10:25 AM", read: true },
    { id: 5, sender: "them", text: "Perfect! Let's say 10 AM. You'll prepare a 3-course tasting menu for our panel.", time: "10:27 AM", read: true },
    { id: 6, sender: "me", text: "That sounds wonderful. I'll prepare my signature French Continental menu. Should I bring anything specific?", time: "10:28 AM", read: true },
    { id: 7, sender: "them", text: "Can you come for a trial this Saturday?", time: "2m ago", read: false, isLatest: true },
  ],
};

const MessageBubble = ({ msg, isMe }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        mb: 1.5,
        alignItems: "flex-end",
        gap: 1,
      }}
    >
      {!isMe && (
        <Avatar sx={{ width: 30, height: 30, fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>TH</Avatar>
      )}
      <Box maxWidth="68%">
        <Box
          sx={{
            px: 2, py: 1.25,
            borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
            background: isMe ? premiumGradient : "rgba(255,255,255,0.08)",
            boxShadow: isMe ? "0 4px 16px rgba(224,123,57,0.25)" : "none",
            border: isMe ? "none" : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography variant="body2" sx={{ color: isMe ? "white" : "rgba(255,255,255,0.9)", lineHeight: 1.55 }}>
            {msg.text}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5} mt={0.5} justifyContent={isMe ? "flex-end" : "flex-start"}>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>{msg.time}</Typography>
          {isMe && <DoneAllIcon sx={{ fontSize: 13, color: msg.read ? "#3B82F6" : "rgba(255,255,255,0.3)" }} />}
        </Box>
      </Box>
    </Box>
  </motion.div>
);

export const ChatPage = () => {
  const [activeConv, setActiveConv] = useState(CONVERSATIONS[0]);
  const [messages, setMessages] = useState(MESSAGES[1] || []);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), sender: "me", text: input, time: "Now", read: false };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const filtered = CONVERSATIONS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        height: "calc(100vh - 76px)",
        display: "flex",
        background: `linear-gradient(160deg, #080F1D 0%, #0F172A 100%)`,
        overflow: "hidden",
      }}
    >
      {/* ── Sidebar ── */}
      <Box
        sx={{
          width: { xs: "100%", md: 320 },
          display: { xs: activeConv ? "none" : "flex", md: "flex" },
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(8,15,29,0.8)",
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2.5, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: "white", mb: 2 }}>Messages</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "rgba(255,255,255,0.35)", fontSize: 18 }} /></InputAdornment>,
              sx: { bgcolor: "rgba(255,255,255,0.06)", "& fieldset": { borderColor: "rgba(255,255,255,0.08)" }, "& input": { color: "white", fontSize: "0.875rem" }, borderRadius: 3 },
            }}
          />
        </Box>

        {/* Conversation List */}
        <Box sx={{ flex: 1, overflow: "auto", "&::-webkit-scrollbar": { width: 4 }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 } }}>
          {filtered.map((conv) => (
            <Box
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              sx={{
                p: 2,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                bgcolor: activeConv?.id === conv.id ? "rgba(255,255,255,0.06)" : "transparent",
                "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                transition: "background 0.15s",
                borderLeft: activeConv?.id === conv.id ? `3px solid ${BRAND.orange}` : "3px solid transparent",
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  conv.online ? (
                    <Box sx={{ width: 11, height: 11, borderRadius: "50%", bgcolor: "#10B981", border: "2px solid #080F1D" }} />
                  ) : null
                }
              >
                <Avatar sx={{ width: 46, height: 46, bgcolor: alpha(conv.color, 0.2), color: conv.color, fontWeight: 700, fontSize: "0.9rem" }}>
                  {conv.avatar}
                </Avatar>
              </Badge>
              <Box flex={1} minWidth={0}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" fontWeight={700} sx={{ color: "white" }} noWrap>{conv.name}</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", flexShrink: 0 }}>{conv.time}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", display: "block" }} noWrap>{conv.role}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.25}>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.76rem" }} noWrap>{conv.lastMsg}</Typography>
                  {conv.unread > 0 && (
                    <Box sx={{ width: 20, height: 20, borderRadius: "50%", background: premiumGradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Typography sx={{ fontSize: "0.65rem", color: "white", fontWeight: 800 }}>{conv.unread}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Chat Area ── */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {activeConv ? (
          <>
            {/* Chat Header */}
            <Box
              sx={{
                px: 3, py: 2,
                display: "flex", alignItems: "center", gap: 2,
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(8,15,29,0.9)",
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  activeConv.online ? (
                    <Box sx={{ width: 11, height: 11, borderRadius: "50%", bgcolor: "#10B981", border: "2px solid #080F1D" }} />
                  ) : null
                }
              >
                <Avatar sx={{ width: 42, height: 42, bgcolor: alpha(activeConv.color, 0.2), color: activeConv.color, fontWeight: 700 }}>
                  {activeConv.avatar}
                </Avatar>
              </Badge>
              <Box flex={1}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: "white" }}>{activeConv.name}</Typography>
                <Typography variant="caption" sx={{ color: activeConv.online ? "#10B981" : "rgba(255,255,255,0.4)" }}>
                  {activeConv.online ? "● Online" : "Last seen recently"}
                </Typography>
              </Box>
              <Stack direction="row" spacing={0.5}>
                <IconButton sx={{ color: "rgba(255,255,255,0.6)", "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.07)" } }}>
                  <VideocamIcon />
                </IconButton>
                <IconButton sx={{ color: "rgba(255,255,255,0.6)", "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.07)" } }}>
                  <ScheduleIcon />
                </IconButton>
                <IconButton sx={{ color: "rgba(255,255,255,0.6)", "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.07)" } }}>
                  <MoreVertIcon />
                </IconButton>
              </Stack>
            </Box>

            {/* Quick Action Chips */}
            <Box sx={{ px: 3, py: 1.5, borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(8,15,29,0.7)" }}>
              <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 0.5, "&::-webkit-scrollbar": { display: "none" } }}>
                {["Schedule Interview", "Share Portfolio", "Attach Resume", "Send Rate Card"].map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    size="small"
                    onClick={() => {}}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      flexShrink: 0,
                      "&:hover": { bgcolor: alpha(BRAND.orange, 0.15), borderColor: alpha(BRAND.orange, 0.3), color: BRAND.orangeLight },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Messages */}
            <Box
              sx={{
                flex: 1, overflow: "auto", p: 3,
                "&::-webkit-scrollbar": { width: 5 },
                "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.08)", borderRadius: 3 },
              }}
            >
              {/* Date divider */}
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Divider sx={{ flex: 1, borderColor: "rgba(255,255,255,0.06)" }} />
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 600, fontSize: "0.7rem" }}>TODAY</Typography>
                <Divider sx={{ flex: 1, borderColor: "rgba(255,255,255,0.06)" }} />
              </Box>

              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} isMe={msg.sender === "me"} />
              ))}

              {/* Interview card */}
              <Box display="flex" justifyContent="center" my={2}>
                <Paper sx={{ ...glassDark(0.6), borderRadius: 3, p: 2.5, border: `1px solid ${alpha(BRAND.gold, 0.25)}`, maxWidth: 340, width: "100%" }}>
                  <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
                    <ScheduleIcon sx={{ color: BRAND.gold, fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={700} sx={{ color: "white" }}>Interview Scheduled</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)", display: "block" }}>Saturday, Jan 11 · 10:00 AM</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>Taj Hotel Kitchen · In-person trial</Typography>
                  <Box display="flex" gap={1} mt={1.5}>
                    <Chip label="Confirmed" size="small" sx={{ bgcolor: alpha("#10B981", 0.15), color: "#10B981", fontWeight: 700, height: 22, fontSize: "0.7rem" }} />
                    <Chip label="Add to Calendar" size="small" sx={{ bgcolor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", height: 22, fontSize: "0.7rem" }} />
                  </Box>
                </Paper>
              </Box>

              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box
              sx={{
                p: 2.5, borderTop: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(8,15,29,0.9)",
              }}
            >
              <Box
                sx={{
                  display: "flex", alignItems: "flex-end", gap: 1.5,
                  bgcolor: "rgba(255,255,255,0.06)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.09)",
                  p: 1,
                  pl: 2,
                }}
              >
                <IconButton size="small" sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: BRAND.orange } }}>
                  <InsertEmoticonIcon />
                </IconButton>
                <TextField
                  multiline
                  maxRows={4}
                  fullWidth
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: { color: "white", fontSize: "0.9375rem", "& textarea::placeholder": { color: "rgba(255,255,255,0.3)" } },
                  }}
                />
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <IconButton size="small" sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: BRAND.orange } }}>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: BRAND.orange } }}>
                    <DescriptionIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: BRAND.orange } }}>
                    <MicIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleSend}
                    disabled={!input.trim()}
                    sx={{
                      background: input.trim() ? premiumGradient : "rgba(255,255,255,0.08)",
                      color: input.trim() ? "white" : "rgba(255,255,255,0.3)",
                      borderRadius: 2.5,
                      width: 38, height: 38,
                      "&:hover": { transform: input.trim() ? "scale(1.1)" : "none" },
                      transition: "all 0.2s",
                    }}
                  >
                    <SendIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.4)" }}>Select a conversation</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.25)" }}>Choose from your messages on the left</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
