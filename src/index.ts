import express, { Request, Response } from 'express';
import { OpenAIService } from './service/openai.service';
import { Routes } from './routes/routes';

const app = express();
const PORT = process.env.PORT || 3000;

const OpenAI = OpenAIService.getInstance();  // Create an instance of OpenAIService

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!'); 
});

app.post('/api', new Routes().router); // Use the Routes class to handle API requests

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});