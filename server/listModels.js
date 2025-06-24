// server/listModels.js
require("dotenv").config(); // Load the API key from your .env file
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Instantiate the client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function discoverModels() {
  console.log("Fetching available models...\n");
  try {
    // The listModels() method returns an array of available models
    const models = await genAI.listModels();

    for (const model of models) {
      // The 'name' is the ID you use in your code (e.g., 'models/gemini-1.0-pro')
      // The 'supportedGenerationMethods' tells you if it can be used for chat/Q&A
      if (model.supportedGenerationMethods.includes("generateContent")) {
        console.log(`- Model Name (ID): ${model.name}`);
        console.log(`  Display Name: ${model.displayName}`);
        console.log(`  Description: ${model.description.substring(0, 80)}...`); // Show first 80 chars
        console.log("  ✅ Can be used for your bot!\n");
      }
    }
  } catch (error) {
    console.error("Failed to fetch models:", error);
  }
}

discoverModels();
