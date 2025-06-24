// server/server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// --- API CLIENTS SETUP ---
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY;

// --- PROMPT ENGINEERING ---

// PROMPT 1: For the first AI call to classify the user's intent.
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

User question: "How is GOOG doing?"
Your response: { "requires_api_call": true, "ticker": "GOOG" }

User question:
---
{USER_QUESTION}
---
`;

// PROMPT 2: For the second AI call to generate the final answer for the user.
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


// --- SERVER LOGIC ---
app.post('/api/chat', async (req, res) => {
  try {
    // Get both message and selected model from the request body
    const { message: userInput, model: selectedModel } = req.body;
    // Provide a fallback model in case one isn't sent from the frontend
    const modelToUse = selectedModel || 'gemini-2.5-flash';
    
    console.log(`Using model: ${modelToUse}`); // For debugging

    // Dynamically get the model based on frontend selection
    const model = genAI.getGenerativeModel({ model: modelToUse }); 
    let context = "No real-time data available for this query.";

    // --- STEP 1: CLASSIFY USER INTENT ---
    const classificationFullPrompt = classifierPrompt.replace('{USER_QUESTION}', userInput);
    const classificationResult = await model.generateContent(classificationFullPrompt);
    const classificationText = classificationResult.response.text();
    
    let classification = { requires_api_call: false, ticker: null };
    try {
        const jsonMatch = classificationText.match(/\{[\s\S]*\}/);
        if (jsonMatch && jsonMatch[0]) {
            classification = JSON.parse(jsonMatch[0]);
        } else {
            console.error("No valid JSON found in classification response:", classificationText);
        }
    } catch (e) {
        console.error("Could not parse the extracted JSON:", e);
        console.error("Original text from AI:", classificationText);
    }

    // --- STEP 2: LOGIC - FETCH DATA IF NEEDED ---
    if (classification.requires_api_call && classification.ticker && alphaVantageApiKey) {
      const ticker = classification.ticker;
      console.log(`Classifier identified ticker: ${ticker}. Fetching data...`);

      try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${alphaVantageApiKey}`;
        const response = await axios.get(url);
        const quote = response.data['Global Quote'];

        if (quote && Object.keys(quote).length > 0) {
          context = `
            Retrieved real-time data for ${quote['01. symbol']}:
            - Price: $${parseFloat(quote['05. price']).toFixed(2)}
            - Change: $${parseFloat(quote['09. change']).toFixed(2)}
            - Percent Change: ${quote['10. change percent']}
            - Trading Day: ${quote['07. latest trading day']}
          `;
        } else {
            context = `Could not retrieve real-time data for ticker "${ticker}". It may be an invalid symbol.`;
        }
      } catch (apiError) {
        console.error("Alpha Vantage API Error:", apiError.message);
        context = "There was an error trying to fetch real-time financial data.";
      }
    }

    // --- STEP 3: GENERATE FINAL RESPONSE ---
    const finalPrompt = generatorPrompt
      .replace('{CONTEXT}', context)
      .replace('{USER_QUESTION}', userInput);

    const finalResult = await model.generateContent(finalPrompt);
    const botResponse = finalResult.response.text();
    
    res.json({ reply: botResponse });

  } catch (error) {
    console.error('Error in main chat handler:', error); 
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

app.get('/', (req, res) => {
  res.send('AI Bot Server (Smart Intent Detection with Dynamic Models) is online.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});