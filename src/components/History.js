import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Clock, 
  Trash2, 
  Bot,
  RefreshCw 
} from 'lucide-react';
import { notificationManager } from '../utils/notificationManager';

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stats = JSON.parse(localStorage.getItem('usage_stats') || '{}');
      const allHistoryItems = [];
      
      // Convert daily stats into history items
      Object.entries(stats.daily || {}).forEach(([date, counts]) => {
        if (counts.text > 0) {
          allHistoryItems.push({
            id: `text-${date}`,
            type: 'text',
            title: 'Text Generation',
            description: `Generated ${counts.text} text${counts.text > 1 ? 's' : ''}`,
            date: new Date(date).toLocaleDateString(),
            count: counts.text
          });
        }
        
        if (counts.image > 0) {
          allHistoryItems.push({
            id: `image-${date}`,
            type: 'image',
            title: 'Image Generation',
            description: `Generated ${counts.image} image${counts.image > 1 ? 's' : ''}`,
            date: new Date(date).toLocaleDateString(),
            count: counts.image
          });
        }
      });

      // Sort by date descending (most recent first)
      allHistoryItems.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setHistory(allHistoryItems);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading history:', error);
      notificationManager.error('Failed to load history');
      setHistory([]);
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('usage_stats');
      setHistory([]);
      notificationManager.success('History cleared successfully');
    } catch (error) {
      console.error('Error clearing history:', error);
      notificationManager.error('Failed to clear history');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-dark-border rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-dark-border rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Generation History</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track your AI generation activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadHistory}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
            title="Refresh history"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Clear history"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        </div>
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-paper rounded-xl border border-gray-100 dark:border-dark-border">
          <Bot className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No history yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start generating content to see your history here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-dark-paper rounded-xl border border-gray-100 dark:border-dark-border p-4 flex items-start gap-4"
            >
              {item.type === 'text' ? (
                <FileText className="w-8 h-8 text-primary-500" />
              ) : (
                <ImageIcon className="w-8 h-8 text-primary-500" />
              )}
              <div className="flex-1">
                <h3 className="font-medium dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.date}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;