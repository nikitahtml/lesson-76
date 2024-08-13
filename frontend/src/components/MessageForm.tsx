import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface MessageFormProps {
    onSend: (author: string, message: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSend }) => {
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (author && message) {
            onSend(author, message);
            setAuthor('');
            setMessage('');
        }
    };

    return (
        <div>
            <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleSubmit}>
                Send
            </Button>
        </div>
    );
};

export default MessageForm;
