require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fal } = require('@fal-ai/client');

const app = express();
app.use(cors());
app.use(express.json());

fal.config({
  credentials: process.env.FAL_KEY
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

    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt,
        image_size: imageSize,
        num_inference_steps: numSteps,
        num_images: 1
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log('Progress:', update.logs);
        }
      }
    });

    res.json({ url: result.data.images[0].url });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('FAL_KEY:', process.env.FAL_KEY ? 'Configured ✓' : 'Missing ✗');
});