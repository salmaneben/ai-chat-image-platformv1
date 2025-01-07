// src/utils/statsTracker.js

const STATS_KEY = 'usage_stats';
const PRESERVED_STATS_PREFIX = 'preserved_stats';

const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
};

const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.uid || null;
  } catch {
    return null;
  }
};

const getStatsKeyForUser = (userId) => {
  return userId ? `${STATS_KEY}_${userId}` : null;
};

const getPreservedStatsKey = (userId) => {
  return userId ? `${PRESERVED_STATS_PREFIX}_${userId}` : null;
};

const initializeStats = () => {
  const date = getCurrentDate();
  const month = getCurrentMonth();
  
  return {
    daily: {
      [date]: {
        text: 0,
        image: 0
      }
    },
    monthly: {
      [month]: {
        text: 0,
        image: 0
      }
    },
    total: {
      text: 0,
      image: 0
    },
    lastUpdated: Date.now()
  };
};

export const preserveUserStats = (userId) => {
  if (!userId) return;
  
  const statsKey = getStatsKeyForUser(userId);
  const preservedKey = getPreservedStatsKey(userId);
  
  try {
    const currentStats = localStorage.getItem(statsKey);
    if (currentStats) {
      localStorage.setItem(preservedKey, currentStats);
    }
  } catch (error) {
    console.error('Error preserving stats:', error);
  }
};

export const restoreUserStats = (userId) => {
  if (!userId) return null;
  
  const statsKey = getStatsKeyForUser(userId);
  const preservedKey = getPreservedStatsKey(userId);
  
  try {
    const preservedStats = localStorage.getItem(preservedKey);
    if (preservedStats) {
      localStorage.setItem(statsKey, preservedStats);
      localStorage.removeItem(preservedKey);
      return JSON.parse(preservedStats);
    }
  } catch (error) {
    console.error('Error restoring stats:', error);
  }
  
  return initializeStats();
};

export const trackGeneration = (type) => {
  const userId = getUserId();
  if (!userId) return null;

  const statsKey = getStatsKeyForUser(userId);
  
  try {
    const existingStats = localStorage.getItem(statsKey);
    const stats = existingStats ? JSON.parse(existingStats) : initializeStats();
    
    const date = getCurrentDate();
    const month = getCurrentMonth();

    // Initialize or update structure
    if (!stats.daily) stats.daily = {};
    if (!stats.monthly) stats.monthly = {};
    if (!stats.total) stats.total = { text: 0, image: 0 };
    
    if (!stats.daily[date]) stats.daily[date] = { text: 0, image: 0 };
    if (!stats.monthly[month]) stats.monthly[month] = { text: 0, image: 0 };

    // Update counters
    stats.daily[date][type]++;
    stats.monthly[month][type]++;
    stats.total[type]++;
    stats.lastUpdated = Date.now();

    localStorage.setItem(statsKey, JSON.stringify(stats));
    preserveUserStats(userId); // Preserve while updating
    
    return stats;
  } catch (error) {
    console.error('Error tracking generation:', error);
    return null;
  }
};

export const getStats = () => {
  const userId = getUserId();
  if (!userId) return initializeStats();

  const statsKey = getStatsKeyForUser(userId);
  
  try {
    let stats = JSON.parse(localStorage.getItem(statsKey) || 'null');
    
    // If no stats found, try to restore from preserved stats
    if (!stats) {
      stats = restoreUserStats(userId) || initializeStats();
    }

    const date = getCurrentDate();
    const month = getCurrentMonth();

    // Ensure current periods exist
    if (!stats.daily[date]) stats.daily[date] = { text: 0, image: 0 };
    if (!stats.monthly[month]) stats.monthly[month] = { text: 0, image: 0 };

    return {
      daily: {
        text: stats.daily[date].text || 0,
        image: stats.daily[date].image || 0,
        total: (stats.daily[date].text || 0) + (stats.daily[date].image || 0)
      },
      monthly: {
        text: stats.monthly[month].text || 0,
        image: stats.monthly[month].image || 0,
        total: (stats.monthly[month].text || 0) + (stats.monthly[month].image || 0)
      },
      total: {
        text: stats.total.text || 0,
        image: stats.total.image || 0,
        total: (stats.total.text || 0) + (stats.total.image || 0)
      },
      lastUpdated: stats.lastUpdated || Date.now()
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return initializeStats();
  }
};

export const clearStats = () => {
  const userId = getUserId();
  if (!userId) return;

  const statsKey = getStatsKeyForUser(userId);
  const preservedKey = getPreservedStatsKey(userId);
  
  try {
    localStorage.removeItem(statsKey);
    localStorage.removeItem(preservedKey);
  } catch (error) {
    console.error('Error clearing stats:', error);
  }
};