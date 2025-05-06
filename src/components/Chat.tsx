import { useState } from 'react';
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from '../Chat.module.scss';

interface Message {
  text: string;
  isBot: boolean;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setInputValue('');

    // Simulate bot response (you can replace this with actual API call)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'I received your message!', isBot: true }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {messages.length === 0 ? (
          <div className={`${styles.welcomeMessage}`}>
            Hello! How can I help you today?
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${message.isBot ? styles.bot : styles.user}`}
            >
              {message.text}
            </div>
          ))
        )}
      </div>
      <div className={styles.chatInputContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
          />
          <Button
            type="default"
            shape="circle"
            icon={<SendOutlined style={{ color: '#000000' }} />}
            onClick={handleSendMessage}
            className={styles.sendButton}
          />
        </div>
      </div>
    </div>
  );
}; 