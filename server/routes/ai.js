import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Car AI Assistant endpoint
router.post('/car-assistant', async (req, res) => {
  try {
    const { question, carData } = req.body;

    if (!question || !carData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Question and car data are required' 
      });
    }

    // Create a detailed context about the car
    const carContext = `
You are an expert Volkswagen Group car sales assistant. You have complete knowledge about the following car:

**Car Details:**
- Brand: ${carData.brand}
- Model: ${carData.name}
- Tagline: ${carData.tagline || 'N/A'}
- Category: ${carData.category}
- Starting Price: ₹${(carData.startingPrice / 100000).toFixed(2)} Lakh (Ex-showroom)

**Engine & Performance:**
- Engine: ${carData.specs?.engine || 'N/A'}
- Power: ${carData.specs?.power || 'N/A'}
- Torque: ${carData.specs?.torque || 'N/A'}
- Transmission: ${carData.specs?.transmission || 'N/A'}
- Fuel Type: ${carData.specs?.fuelType || 'N/A'}
- Mileage: ${carData.specs?.mileage || 'N/A'}

**Available Variants:**
${carData.variants?.map(v => `- ${v.name}: ₹${(v.price / 100000).toFixed(2)} Lakh`).join('\n') || 'N/A'}

**Available Colors:**
${carData.colors?.map(c => `- ${c.name}`).join('\n') || 'N/A'}

**Key Features:**
${carData.features?.map(f => `- ${f}`).join('\n') || 'N/A'}

**Description:**
${carData.description || 'A premium vehicle from the Volkswagen Group portfolio.'}

**Instructions:**
1. Answer questions ONLY about this specific car (${carData.brand} ${carData.name}).
2. Be helpful, friendly, and professional.
3. If asked about comparisons with competitors, focus on the strengths of this car.
4. If you don't have specific information, say so honestly but try to be helpful.
5. Keep responses concise but informative (2-4 sentences for simple questions).
6. Use Indian Rupees (₹) for all prices and mention "Lakh" for amounts.
7. If asked about booking a test drive or purchase, encourage them to use the "Book Test Drive" button on the page.
8. Format prices nicely (e.g., ₹11.09 Lakh instead of ₹1109000).
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: carContext }],
        },
        {
          role: 'model',
          parts: [{ text: `I understand! I'm your expert assistant for the ${carData.brand} ${carData.name}. I have all the details about this amazing ${carData.category} and I'm ready to help you with any questions. What would you like to know?` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(question);
    const response = await result.response;
    const answer = response.text();

    res.json({
      success: true,
      data: {
        answer,
        carName: `${carData.brand} ${carData.name}`
      }
    });

  } catch (error) {
    console.error('AI Assistant Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get AI response. Please try again.',
      error: error.message 
    });
  }
});

// Quick suggestions endpoint
router.get('/car-suggestions/:carId', (req, res) => {
  const suggestions = [
    "What is the mileage of this car?",
    "What are the available variants and prices?",
    "What safety features does it have?",
    "What is the engine specification?",
    "What colors are available?",
    "Does it have a sunroof?",
    "What is the warranty period?",
    "How does it compare to competitors?"
  ];

  res.json({
    success: true,
    data: suggestions
  });
});

export default router;
