"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const port = 8000;
const dbFilePath = path_1.default.join(__dirname, 'db.json');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const readMessages = () => {
    try {
        if (!fs_1.default.existsSync(dbFilePath)) {
            return [];
        }
        return JSON.parse(fs_1.default.readFileSync(dbFilePath, 'utf-8'));
    }
    catch (error) {
        console.error('Error reading messages:', error);
        throw new Error('Error reading messages');
    }
};
const writeMessages = (messages) => {
    try {
        fs_1.default.writeFileSync(dbFilePath, JSON.stringify(messages, null, 2));
    }
    catch (error) {
        console.error('Error writing messages:', error);
        throw new Error('Error writing messages');
    }
};
app.get('/messages', (req, res) => {
    try {
        const messages = readMessages();
        res.json(messages.slice(-30)); // Возвращаем последние 30 сообщений
    }
    catch (error) {
        console.error('Error handling GET /messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/messages', (req, res) => {
    try {
        const { author, message } = req.body;
        if (!author || !message) {
            return res.status(400).json({ error: 'Author and message must be present in the request' });
        }
        const newMessage = {
            id: (0, uuid_1.v4)(),
            author,
            message,
            datetime: new Date().toISOString()
        };
        const messages = readMessages();
        messages.push(newMessage);
        writeMessages(messages);
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error('Error handling POST /messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
