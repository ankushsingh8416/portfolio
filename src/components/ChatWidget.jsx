"use client";

import { useEffect, useRef, useState } from "react";

const EMOJIS = ["😀", "😊", "😍", "🤔", "👍", "❤️", "🎉", "✨", "💯", "🚀"];

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?", time: "Just now" },
  ]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const chatWidgetRef = useRef(null);
  const chatToggleRef = useRef(null);
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);

  function scrollToBottom() {
    setTimeout(() => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }, 100);
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  function toggleChat() {
    setChatOpen((open) => {
      const next = !open;
      if (next) setTimeout(() => inputRef.current && inputRef.current.focus(), 300);
      return next;
    });
  }

  function addMessage(text, sender) {
    setMessages((msgs) => [...msgs, { sender, text, time: timeNow() }]);
  }

  async function sendMessage() {
    const message = inputValue.trim();
    if (message === "") return;

    addMessage(message, "user");
    setInputValue("");
    setTyping(true);

    try {
      const response = await fetch(
        "https://portfolio-backend-2-idw0.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTyping(false);
      addMessage(data.result || "No response from server", "bot");
    } catch (error) {
      setTyping(false);
      addMessage("⚠️ Error: " + error.message, "bot");
    }
  }

  function addEmoji() {
    const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    setInputValue((value) => value + randomEmoji);
    inputRef.current && inputRef.current.focus();
  }

  function attachFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,.pdf,.doc,.docx";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        addMessage(`📎 File attached: ${file.name}`, "user");
        setTimeout(() => {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            addMessage("Thanks for sharing the file! I've received it.", "bot");
          }, 1500);
        }, 500);
      }
    };
    input.click();
  }

  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        window.innerWidth > 768 &&
        chatOpen &&
        chatWidgetRef.current &&
        !chatWidgetRef.current.contains(e.target) &&
        chatToggleRef.current &&
        !chatToggleRef.current.contains(e.target)
      ) {
        toggleChat();
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape" && chatOpen) {
        toggleChat();
      }
    }
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [chatOpen]);

  const hasText = inputValue.trim().length > 0;

  return (
    <div className="chatbot-container">
      <button
        id="chatbot"
        aria-label="ChatBot"
        ref={chatToggleRef}
        className={chatOpen ? "chat-open" : ""}
        onClick={toggleChat}
      >
        <i className="fab fa-facebook-messenger"></i>
        <i className="fas fa-times"></i>
      </button>

      <div className={`chat${chatOpen ? " show" : ""}`} id="chat-widget" ref={chatWidgetRef}>
        <div className="chat-header">
          <div className="chat-user-info">
            <div className="profile">
              <img src="/assets/images/IMG-20250219-WA0005.jpg" alt="" />
            </div>
            <div>
              <h3>Ankush Rajput</h3>
              <span>Software Developer</span>
            </div>
          </div>
          <span className="chat-close" id="chat-close" onClick={toggleChat}>
            &times;
          </span>
        </div>

        <div className="chat-body" id="chat-body" ref={chatBodyRef}>
          {messages.map((msg, i) => (
            <div className={`message ${msg.sender}-message`} key={i}>
              {msg.text}
              <div className="message-time">{msg.time}</div>
            </div>
          ))}

          <div className={`typing-indicator${typing ? " show" : ""}`} id="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="chat-input-area">
          <div className="input-wrapper">
            <input
              type="text"
              id="chat-input"
              placeholder="Type your message..."
              maxLength={500}
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <div className="input-actions">
              <button className="emoji-btn" title="Add emoji" onClick={addEmoji}>
                <i className="fas fa-smile"></i>
              </button>
              <button className="attachment-btn" title="Attach file" onClick={attachFile}>
                <i className="fas fa-paperclip"></i>
              </button>
            </div>
          </div>
          <button
            id="chat-send"
            title="Send message"
            onClick={sendMessage}
            disabled={!hasText}
            style={{ opacity: hasText ? 1 : 0.6 }}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
