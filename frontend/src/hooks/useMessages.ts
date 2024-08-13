import { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
    id: string;
    author: string;
    message: string;
    datetime: string;
}

const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const fetchMessages = async () => {
        const response = await axios.get<Message[]>('http://localhost:8000/messages');
        setMessages(response.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const sendMessage = async (author: string, message: string) => {
        await axios.post('http://localhost:8000/messages', { author, message });
        fetchMessages();
    };

    return { messages, sendMessage };
};

export default useMessages;

