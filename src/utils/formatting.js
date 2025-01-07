// src/utils/formatting.js

export const formatCost = (cost) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(cost);
  };
  
  export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  export const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      notation: number > 9999 ? 'compact' : 'standard',
      maximumFractionDigits: 1
    }).format(number);
  };