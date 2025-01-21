// src/pages/Settings.js
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cpu, Key, Zap, Save, RefreshCw, AlertCircle 
} from 'lucide-react';
import { notificationManager } from '../utils/notificationManager';

const Settings = () => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [falKey, setFalKey] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const savedOpenaiKey = localStorage.getItem('openai_api_key');
      const savedFalKey = localStorage.getItem('fal_key');
      const savedTemp = localStorage.getItem('gpt_temperature');
      const savedTokens = localStorage.getItem('gpt_max_tokens');

      if (savedOpenaiKey) setOpenaiKey(savedOpenaiKey);
      if (savedFalKey) setFalKey(savedFalKey);
      if (savedTemp) setTemperature(parseFloat(savedTemp));
      if (savedTokens) setMaxTokens(parseInt(savedTokens));
    } catch (error) {
      notificationManager.error('Load Failed', {
        description: 'Failed to load settings. Please try again.',
        action: {
          label: 'Retry',
          onClick: () => loadSettings()
        }
      });
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    const checkChanges = async () => {
      const savedOpenaiKey = localStorage.getItem('openai_api_key') || '';
      const savedFalKey = localStorage.getItem('fal_key') || '';
      const savedTemp = parseFloat(localStorage.getItem('gpt_temperature')) || 0.7;
      const savedTokens = parseInt(localStorage.getItem('gpt_max_tokens')) || 2000;

      setHasChanges(
        openaiKey !== savedOpenaiKey ||
        falKey !== savedFalKey ||
        temperature !== savedTemp ||
        maxTokens !== savedTokens
      );
    };
    checkChanges();
  }, [openaiKey, falKey, temperature, maxTokens]);

  const handleReload = async () => {
    await loadSettings();
    notificationManager.success('Settings Loaded', {
      description: 'Settings loaded successfully'
    });
  };

  const validateSettings = () => {
    if (!openaiKey) {
      notificationManager.warning('API Key Required', {
        description: 'Please enter your OpenAI API key',
        action: {
          label: 'Focus Input',
          onClick: () => document.querySelector('input[placeholder="sk-..."]')?.focus()
        }
      });
      return false;
    }

    if (!falKey) {
      notificationManager.warning('API Key Required', {
        description: 'Please enter your Fal.ai API key',
        action: {
          label: 'Focus Input',
          onClick: () => document.querySelector('input[placeholder="fal..."]')?.focus()
        }
      });
      return false;
    }

    if (temperature < 0 || temperature > 2) {
      notificationManager.warning('Invalid Setting', {
        description: 'Temperature must be between 0 and 2'
      });
      return false;
    }

    if (maxTokens < 100 || maxTokens > 16385) {
      notificationManager.warning('Invalid Setting', {
        description: 'Max tokens must be between 100 and 16,385'
      });
      return false;
    }

    return true;
  };

  const handleSaveSettings = async () => {
    if (!validateSettings()) return;
    setIsLoading(true);

    try {
      localStorage.setItem('openai_api_key', openaiKey);
      localStorage.setItem('fal_key', falKey);
      localStorage.setItem('gpt_temperature', temperature);
      localStorage.setItem('gpt_max_tokens', maxTokens);

      notificationManager.success('Settings Saved', {
        description: 'Your changes have been saved successfully'
      });
      setHasChanges(false);
    } catch (error) {
      notificationManager.error('Save Failed', {
        description: 'Failed to save settings. Please try again.',
        action: {
          label: 'Retry',
          onClick: () => handleSaveSettings()
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex items-center space-x-4">
          {hasChanges && (
            <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Unsaved changes
            </span>
          )}
          <button
            onClick={handleReload}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            title="Reload settings"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* API Keys Section */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Key className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">API Settings</h3>
              <p className="text-sm text-gray-500">Configure your API keys</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API Key
                <span className="ml-2 text-xs text-purple-600 px-2 py-1 bg-purple-50 rounded-full">
                  For Text Generation
                </span>
              </label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-gray-50"
                placeholder="sk-..."
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fal.ai API Key
                <span className="ml-2 text-xs text-purple-600 px-2 py-1 bg-purple-50 rounded-full">
                  For Image Generation
                </span>
              </label>
              <input
                type="password"
                value={falKey}
                onChange={(e) => setFalKey(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-gray-50"
                placeholder="fal..."
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Model Settings */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Cpu className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">Model Settings</h3>
              <p className="text-sm text-gray-500">Configure GPT-3.5 parameters</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Model Display */}
            <div className="p-4 border rounded-xl">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 mt-1 text-purple-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">GPT-3.5</h4>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                      FAST
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Fast and cost-effective for most tasks
                  </p>
                </div>
              </div>
            </div>

            {/* Model Parameters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                  disabled={isLoading}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>More Focused</span>
                  <span>More Creative</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Tokens: {maxTokens}
                </label>
                <input
                  type="range"
                  min="100"
                  max="16385"
                  step="100"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full"
                  disabled={isLoading}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100</span>
                  <span>16,385</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSaveSettings}
          disabled={isLoading || !hasChanges}
          className="flex items-center space-x-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Settings;