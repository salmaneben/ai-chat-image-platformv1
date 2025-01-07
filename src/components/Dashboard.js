import React, { useState, useEffect } from 'react';
import { getStats } from '../utils/statsTracker';
import { 
  FileText, 
  ImagePlus,
  PieChart,
  RefreshCw,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const loadStats = () => {
    const currentStats = getStats();
    console.log('Loaded stats:', currentStats); // Debug log
    setStats(currentStats);
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  useEffect(() => {
    loadStats();
    // Refresh stats every minute
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "primary" }) => (
    <div className="bg-white dark:bg-dark-paper rounded-xl p-6 border border-gray-100 dark:border-dark-border">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-${color}-50 dark:bg-${color}-900/20 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-500 dark:text-${color}-400`} />
        </div>
        <div>
          <div className="text-2xl font-bold dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
          {subtitle && (
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={loadStats}
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
        >
          <RefreshCw className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Zap}
          title="Today's Generations"
          value={stats.daily.total}
          subtitle="Total generations today"
          color="primary"
        />
        <StatCard
          icon={FileText}
          title="Text Generations"
          value={stats.daily.text}
          subtitle="Today's text generations"
          color="blue"
        />
        <StatCard
          icon={ImagePlus}
          title="Image Generations"
          value={stats.daily.image}
          subtitle="Today's image generations"
          color="purple"
        />
      </div>

      {/* Monthly Overview */}
      <div className="bg-white dark:bg-dark-paper rounded-xl p-6 border border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-2 mb-6">
          <PieChart className="w-5 h-5 text-primary-500" />
          <h2 className="text-lg font-medium dark:text-white">Monthly Overview</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500">{stats.monthly.total}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Generations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.monthly.text}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Text Generations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">{stats.monthly.image}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Image Generations</div>
          </div>
        </div>
      </div>

      {/* All-Time Stats */}
      <div className="bg-white dark:bg-dark-paper rounded-xl p-6 border border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-2 mb-6">
          <PieChart className="w-5 h-5 text-primary-500" />
          <h2 className="text-lg font-medium dark:text-white">All-Time Statistics</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500">{stats.total.total}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Generations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.total.text}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Text Generations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">{stats.total.image}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Image Generations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;