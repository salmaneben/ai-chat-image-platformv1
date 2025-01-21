require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fal } = require('@fal-ai/client');

const app = express();
app.use(cors());
app.use(express.json());

// Updated fal configuration
fal.config({
  credentials: {
    key_id: process.env.FAL_KEY_ID,
    key_secret: process.env.FAL_KEY_SECRET,
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const { 
      prompt, 
      imageSize = "landscape_4_3",
      numSteps = 4,
      style = "base"
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Starting image generation with prompt:', prompt);

    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt,
        image_size: imageSize,
        num_inference_steps: numSteps,
        num_images: 1,
        style
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log('Generation progress:', update.logs);
        }
      }
    });

    if (!result.data || !result.data.images || !result.data.images[0]) {
      throw new Error('Invalid response from image generation service');
    }

    console.log('Generation successful, returning URL');
    res.json({ url: result.data.images[0].url });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    fal_configured: !!(process.env.FAL_KEY_ID && process.env.FAL_KEY_SECRET)
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('FAL Key ID:', process.env.FAL_KEY_ID ? 'Configured ✓' : 'Missing ✗');
  console.log('FAL Key Secret:', process.env.FAL_KEY_SECRET ? 'Configured ✓' : 'Missing ✗');
});