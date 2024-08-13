import React from 'react';
import { Container } from '@mui/material';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import useMessages from './hooks/useMessages';
import './App.css';

const App: React.FC = () => {
    const { messages, sendMessage } = useMessages();

    return (
        <Container className="container">
            <MessageForm onSend={sendMessage} />
            <MessageList messages={messages} />
        </Container>
    );
};

export default App;
