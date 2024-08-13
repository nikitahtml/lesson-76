import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import dayjs from 'dayjs';

interface MessageItemProps {
    author: string;
    message: string;
    datetime: string;
}


const MessageItem: React.FC<MessageItemProps> = ({ author, message, datetime }) => {
    return (
        <ListItem className="message-item">
            <ListItemText
                primary={`${author}: ${message}`}
                secondary={dayjs(datetime).format('DD.MM.YYYY HH:mm')}
            />
        </ListItem>
    );
};

export default MessageItem;

