// src/utils/constants.js

export const MODEL_COSTS = {
    'gpt-3.5-turbo-0125': 0.0005,
    'gpt-4-0125-preview': 0.01,
    'dall-e-3': 0.04,
    'dall-e-2': 0.02,
    'stable-diffusion': 0.008
  };
  
  export const USAGE_LIMITS = {
    daily: {
      free: 100,
      pro: 1000
    },
    monthly: {
      free: 1000,
      pro: 10000
    }
  };
  
  export const IMAGE_SIZES = {
    square: {
      dimensions: '1024x1024',
      label: 'Square'
    },
    portrait: {
      dimensions: '1024x1792',
      label: 'Portrait'
    },
    landscape: {
      dimensions: '1792x1024',
      label: 'Landscape'
    }
  };