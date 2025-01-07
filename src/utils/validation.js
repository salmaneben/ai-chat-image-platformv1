// src/utils/validation.js

import { USAGE_LIMITS } from './constants';
import { getStats } from './statsTracker';

export const validateUsage = () => {
  const stats = getStats();
  const { today } = stats;

  // Check daily limit
  if (today.apiCalls >= USAGE_LIMITS.daily.free) {
    return {
      canProceed: false,
      error: 'Daily usage limit reached'
    };
  }

  // Check monthly limit
  const monthlyUsage = stats.totals.apiCalls;
  if (monthlyUsage >= USAGE_LIMITS.monthly.free) {
    return {
      canProceed: false,
      error: 'Monthly usage limit reached'
    };
  }

  return {
    canProceed: true,
    error: null
  };
};

export const validateAPIKey = (key, type = 'openai') => {
  if (!key) return false;
  
  switch (type) {
    case 'openai':
      return key.startsWith('sk-') && key.length > 20;
    case 'replicate':
      return key.startsWith('r8_') && key.length > 20;
    default:
      return false;
  }
};