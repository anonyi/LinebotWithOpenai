const express = require('express');
const { OpenAI } = require('openai');
const line = require('@line/bot-sdk');

// Use environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;
const lineChannelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const lineChannelSecret = process.env.LINE_CHANNEL_SECRET;

const openai = new OpenAI({apiKey: openaiApiKey});

/* Line setting */
const config = {
  channelAccessToken: lineChannelAccessToken,
  channelSecret: lineChannelSecret
};

const client = new line.Client(config);
const app = express();
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

// Array to store conversation history
let conversationHistory = [
  { role: "system", content: "You are a helpful and friendly assistant. Your tone is professional yet approachable. Always provide clear and concise answers, and avoid discussing controversial or sensitive topics. If you don't know the answer, politely admit it and suggest alternative resources." }
];

// LINE Bot Webhook
app.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-line-signature'];
    if (!line.validateSignature(req.rawBody, config.channelSecret, signature)) {
      throw new Error('Invalid signature');
    }

    const events = req.body.events;
    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const userMessage = event.message.text;

        // Add user message to conversation history
        conversationHistory.push({ role: 'user', content: userMessage });

        // Limit the length of conversation history, e.g., keep only the last 5 messages
        if (conversationHistory.length > 6) {
          conversationHistory = conversationHistory.slice(-6);
      }

        // Connect to OpenAI API with model, role, and content
        const openaiResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini-2024-07-18', // Replace with your model
          messages: conversationHistory,
          temperature: 0.7, // Adjust temperature for more or less randomness
        });

        const openaiResult = openaiResponse.choices[0].message.content;

        // Add OpenAI's response to conversation history
        conversationHistory.push({ role: 'assistant', content: openaiResult });

        // Reply to LINE Bot
        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: openaiResult
        });
      }
    }
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
