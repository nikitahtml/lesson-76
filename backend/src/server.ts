import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';


const app = express();
const port = 8000;

const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());
app.use(cors());
const readMessages = () => {
    try {
        if (!fs.existsSync(dbFilePath)) {
            return [];
        }
        return JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    } catch (error) {
        console.error('Error reading messages:', error);
        throw new Error('Error reading messages');
    }
};

const writeMessages = (messages: any[]) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(messages, null, 2));
    } catch (error) {
        console.error('Error writing messages:', error);
        throw new Error('Error writing messages');
    }
};

app.get('/messages', (req: Request, res: Response) => {
    try {
        const messages = readMessages();
        res.json(messages.slice(-30));
    } catch (error) {
        console.error('Error handling GET /messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/messages', (req: Request, res: Response) => {
    try {
        const { author, message } = req.body;

        if (!author || !message) {
            return res.status(400).json({ error: 'Author and message must be present in the request' });
        }

        const newMessage = {
            id: uuidv4(),
            author,
            message,
            datetime: new Date().toISOString()
        };

        const messages = readMessages();
        messages.push(newMessage);
        writeMessages(messages);

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error handling POST /messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
