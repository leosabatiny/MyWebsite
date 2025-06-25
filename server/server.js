// server/server.js

// REGION START: setup
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY;
const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
// REGION END: setup

// REGION START: classifier-prompt
const classifierPrompt = `
You are a financial query classifier. Your job is to analyze the user's question and determine two things:
1. Does the user require real-time stock price information?
2. If so, what is the official stock ticker symbol for the company mentioned?

Respond ONLY with a valid JSON object in the following format. Do not add any other text or markdown.
Format: { "requires_api_call": boolean, "ticker": "string" or null }

Examples:
User question: "what is the price of tesla stock right now"
Your response: { "requires_api_call": true, "ticker": "TSLA" }

User question: "tell me about microsoft"
Your response: { "requires_api_call": true, "ticker": "MSFT" }

User question: "what is a stock?"
Your response: { "requires_api_call": false, "ticker": null }
`;
// REGION END: classifier-prompt

// REGION START: generator-prompt
const generatorPrompt = `You are an expert financial market analyst bot named Leo. Your goal is to provide clear, data-driven, and unbiased answers.
- Format your response using Markdown. Use bullet points for lists and bold for emphasis on key terms or numbers.
- Do not give financial advice or say "you should buy" or "sell".
- If real-time data is provided in the context, use it as the primary source for your answer. Summarize the key data points clearly and state that you have retrieved live information.
- If no real-time data is provided, answer based on your general knowledge and clearly state that you do not have access to live data for the query.

CONTEXT:
---
{CONTEXT}
---

Based on the context above, answer the following user's question using Markdown formatting:
{USER_QUESTION}`;
// REGION END: generator-prompt

// REGION START: server-logic
app.post('/api/chat', async (req, res) => {
  try {
    const { message: userInput, model: selectedModel } = req.body;
    const modelToUse = selectedModel || 'gemini-1.5-flash';
    console.log(`Using model: ${modelToUse}`);
    const model = genAI.getGenerativeModel({ model: modelToUse }); 
    let context = "No real-time data available for this query.";

    const classificationFullPrompt = classifierPrompt.replace('{USER_QUESTION}', userInput);
    const classificationResult = await model.generateContent(classificationFullPrompt);
    const classificationText = classificationResult.response.text();
    
    let classification = { requires_api_call: false, ticker: null };
    try {
        const jsonMatch = classificationText.match(/\{[\s\S]*\}/);
        if (jsonMatch && jsonMatch[0]) {
            classification = JSON.parse(jsonMatch[0]);
        }
    } catch (e) {
        console.error("Could not parse classification JSON:", classificationText);
    }

    if (classification.requires_api_call && classification.ticker && alphaVantageApiKey) {
      const ticker = classification.ticker;
      console.log(`Classifier identified ticker: ${ticker}. Fetching data...`);
      try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${alphaVantageApiKey}`;
        const response = await axios.get(url);
        const quote = response.data['Global Quote'];

        if (quote && Object.keys(quote).length > 0) {
          context = `Retrieved real-time data for ${quote['01. symbol']}:...`; // Condensed for brevity
        } else {
            context = `Could not retrieve real-time data for ticker "${ticker}".`;
        }
      } catch (apiError) {
        console.error("Alpha Vantage API Error:", apiError.message);
        context = "There was an error trying to fetch real-time financial data.";
      }
    }

    const finalPrompt = generatorPrompt.replace('{CONTEXT}', context).replace('{USER_QUESTION}', userInput);
    const finalResult = await model.generateContent(finalPrompt);
    const botResponse = finalResult.response.text();
    
    res.json({ reply: botResponse });
  } catch (error) {
    console.error('Error in main chat handler:', error); 
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query; // Get lat/lon from query parameters
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required.' });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
        
        const response = await axios.get(url);
        res.json(response.data); // Forward the data to the frontend

    } catch (error) {
        console.error('Weather API proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch weather data.' });
    }
});

// REGION END: server-logic

// REGION START: server-start
app.get('/', (req, res) => {
  res.send('Leonardo\'s API Server is online.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// REGION END: server-start