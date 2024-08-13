import React from 'react';
import { List } from '@mui/material';
import MessageItem from './MessageItem';

interface Message {
    id: string;
    author: string;
    message: string;
    datetime: string;
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <List className="message-list">
            {messages.map((msg) => (
                <MessageItem
                    key={msg.id}
                    author={msg.author}
                    message={msg.message}
                    datetime={msg.datetime}
                />
            ))}
        </List>
    );
};

export default MessageList;
