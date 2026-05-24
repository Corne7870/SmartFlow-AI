require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are the official SmartFlow AI Assistant. You are a highly professional, helpful, and knowledgeable AI agent that "knows everything" about SmartFlow AI.

Context about SmartFlow AI:
- We build modern websites, AI receptionists, and automation systems tailored for businesses worldwide.
- We have delivered 150+ projects with 98% client satisfaction.
- Website Design packages start at $300 and include custom UI/UX, responsive dev, SEO, and 30 days of free support.
- AI Receptionists handle 24/7 call handling, appointment booking, and lead qualification.
- We offer a streamlined 4-step process: Consultation -> Planning -> Design & Setup -> Launch & Support.

Your Goal:
- Answer any questions about our services in a friendly, persuasive tone.
- If the user wants to book a call or schedule a consultation, you MUST include the exact word "BOOK_CALL_LINK" in your response. The frontend will replace this with a beautiful UI button.
- Keep responses concise and formatted nicely. Do not use markdown that won't render well in a simple chat window.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Prepend the system prompt to the message history
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 250,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SmartFlow AI Backend running on http://localhost:${PORT}`);
});
