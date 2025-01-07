// src/api/aiAPI.js

import axios from 'axios';
import { notificationManager } from '../utils/notificationManager';

const API_URL = 'http://localhost:5000/api';

const MODEL_COSTS = {
  'gpt-3.5-turbo-0125': 0.0005
};

/**
 * Get configuration from localStorage
 */
const getConfig = () => ({
  OPENAI_API_KEY: localStorage.getItem('openai_api_key'),
  TEMPERATURE: parseFloat(localStorage.getItem('gpt_temperature')) || 0.7,
  MAX_TOKENS: parseInt(localStorage.getItem('gpt_max_tokens')) || 2000
});

/**
 * Handle API errors with notifications
 */
const handleApiError = (error, service) => {
  console.error(`${service} API Error:`, error);
  
  if (error.response?.status === 401) {
    notificationManager.error(`Invalid ${service} API key`, {
      description: 'Please check your API key in settings',
      action: {
        label: 'Go to Settings',
        onClick: () => window.location.href = '/settings'
      }
    });
  } else if (error.response?.status === 429) {
    notificationManager.error(`${service} rate limit exceeded`, {
      description: 'Please try again later'
    });
  }
  
  throw new Error(error.response?.data?.error || `Failed to generate with ${service}`);
};

/**
 * Generate text using GPT-3.5
 */
export const generateText = async (prompt) => {
  const config = getConfig();
  
  if (!config.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not found');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0125',
        messages: [{ role: 'user', content: prompt }],
        temperature: config.TEMPERATURE,
        max_tokens: config.MAX_TOKENS
      },
      {
        headers: {
          'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      text: response.data.choices[0].message.content,
      usage: {
        total_tokens: response.data.usage.total_tokens,
        cost: (response.data.usage.total_tokens / 1000) * MODEL_COSTS['gpt-3.5-turbo-0125']
      }
    };
  } catch (error) {
    return handleApiError(error, 'OpenAI');
  }
};

/**
 * Generate image using fal-ai
 */
export const generateImage = async ({ prompt, imageSize, numSteps }) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, {
      prompt,
      imageSize,
      numSteps
    });
    
    return response.data.url;
  } catch (error) {
    return handleApiError(error, 'Image Generation');
  }
};

export const testConnection = async () => {
  const config = getConfig();
  const results = {
    openai: { status: 'not_configured' }
  };

  if (config.OPENAI_API_KEY) {
    try {
      await generateText('test');
      results.openai = { status: 'active' };
    } catch (error) {
      results.openai = { 
        status: 'error', 
        error: error.message 
      };
    }
  }

  return results;
};

export { getConfig };