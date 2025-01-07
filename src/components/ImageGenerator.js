import React, { useState } from 'react';
import { generateImage } from '../api/aiAPI';
import { trackGeneration } from '../utils/statsTracker';
import { 
  AlertCircle, 
  ImagePlus, 
  Loader2, 
  Layout,
  Sliders,
  Bot,
  Image as ImageIcon,
  Download,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import { notificationManager } from '../utils/notificationManager';

const IMAGE_SIZES = [
  { 
    value: 'landscape_16_9', 
    label: 'Landscape 16:9', 
    dimensions: '1024×576'
  },
  { 
    value: 'landscape_4_3', 
    label: 'Landscape 4:3', 
    dimensions: '1024×768'
  },
  { 
    value: 'square', 
    label: 'Square', 
    dimensions: '1024×1024'
  },
  { 
    value: 'portrait_4_3', 
    label: 'Portrait 4:3', 
    dimensions: '768×1024'
  },
  { 
    value: 'portrait_16_9', 
    label: 'Portrait 16:9', 
    dimensions: '576×1024'
  }
];

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [generationTime, setGenerationTime] = useState(null);
  const [settings, setSettings] = useState({
    imageSize: 'landscape_4_3',
    numSteps: 4
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      notificationManager.warning('Empty Prompt', {
        description: 'Please enter a description of the image you want to generate',
        action: {
          label: 'Focus Input',
          onClick: () => document.querySelector('textarea')?.focus()
        }
      });
      return;
    }

    setIsLoading(true);
    setError('');
    setImageUrl('');
    setGenerationTime(null);

    const startTime = Date.now();
    const loadingId = notificationManager.show({
      type: 'ai',
      description: 'Generating your image...',
      showProgress: true,
      duration: 0,
      action: {
        label: 'Cancel',
        onClick: () => {
          setIsLoading(false);
          notificationManager.remove(loadingId);
        }
      }
    });

    try {
      const url = await generateImage({
        prompt: prompt,
        imageSize: settings.imageSize,
        numSteps: settings.numSteps
      });

      const endTime = Date.now();
      setGenerationTime(endTime - startTime);
      setImageUrl(url);
      
      // Track the generation
      trackGeneration('image', 0.02);
      
      notificationManager.remove(loadingId);
      notificationManager.success('Image Generated', {
        description: `Generated in ${((endTime - startTime) / 1000).toFixed(2)}s`,
        icon: CheckCircle,
        action: {
          label: 'View',
          onClick: () => window.open(url, '_blank')
        }
      });
    } catch (err) {
      setError(err.message);
      notificationManager.remove(loadingId);
      notificationManager.error('Generation Failed', {
        description: err.message,
        action: {
          label: 'Try Again',
          onClick: () => handleGenerate()
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      notificationManager.success('Image Downloaded', {
        description: 'Image saved to your downloads'
      });
    } catch (error) {
      notificationManager.error('Download Failed', {
        description: 'Failed to download the image. Please try again.',
        action: {
          label: 'Retry',
          onClick: () => handleDownload()
        }
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Settings */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Model Info */}
          <div className="bg-white dark:bg-dark-paper rounded-xl shadow-sm p-6 border border-gray-100 dark:border-dark-border">
            <div className="flex items-center space-x-3 mb-4">
              <Bot className="h-6 w-6 text-primary-500" />
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
                  fal-ai/flux
                  <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400">
                    FAST
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Fast and efficient image generation</p>
              </div>
            </div>
          </div>

          {/* Image Settings */}
          <div className="bg-white dark:bg-dark-paper rounded-xl shadow-sm p-6 border border-gray-100 dark:border-dark-border">
            <div className="flex items-center space-x-3 mb-6">
              <Sliders className="h-6 w-6 text-primary-500" />
              <h4 className="text-lg font-semibold dark:text-white">Image Settings</h4>
            </div>

            <div className="space-y-4">
              {/* Image Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image Size
                </label>
                <div className="grid gap-2">
                  {IMAGE_SIZES.map(size => (
                    <div
                      key={size.value}
                      onClick={() => setSettings(prev => ({ ...prev, imageSize: size.value }))}
                      className={`p-3 border dark:border-dark-border rounded-lg cursor-pointer transition-all ${
                        settings.imageSize === size.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Layout className="h-4 w-4 text-gray-400" />
                          <span className="font-medium dark:text-white">{size.label}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {size.dimensions}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Steps */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Generation Steps: {settings.numSteps}
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={settings.numSteps}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    numSteps: parseInt(e.target.value)
                  }))}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Faster</span>
                  <span>Better Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Prompt and Output */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <span className="text-red-700 dark:text-red-400">{error}</span>
            </div>
          )}

          {/* Prompt Input */}
          <div className="bg-white dark:bg-dark-paper rounded-xl shadow-sm p-6 border border-gray-100 dark:border-dark-border">
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold dark:text-white">Image Prompt</h4>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-border border dark:border-dark-border focus:ring-2 focus:ring-primary-500 resize-none h-32 dark:text-white"
                disabled={isLoading}
              />

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <ImagePlus className="h-5 w-5" />
                      <span>Generate Image</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Image */}
          {imageUrl && (
            <div className="bg-white dark:bg-dark-paper rounded-xl shadow-sm p-6 border border-gray-100 dark:border-dark-border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold dark:text-white">Generated Image</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDownload}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                    title="Download image"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <a
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  {generationTime && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-border px-2 py-1 rounded-full">
                      {(generationTime / 1000).toFixed(2)}s
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-border rounded-lg p-2">
                <img 
                  src={imageUrl}
                  alt="Generated"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex justify-between items-center">
                  <span>Model: fal-ai/flux</span>
                  <span>Size: {IMAGE_SIZES.find(s => s.value === settings.imageSize)?.dimensions}</span>
                  <span>Steps: {settings.numSteps}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;