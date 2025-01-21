import React, { useState } from 'react';
import { generateText } from '../api/aiAPI';
import { trackGeneration } from '../utils/statsTracker';
import { 
  Bot, 
  Send, 
  Copy, 
  Download, 
  Loader2,
  CheckCircle 
} from 'lucide-react';
import { notificationManager } from '../utils/notificationManager';

const TextGenerator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [error, setError] = useState('');
  const [generationTime, setGenerationTime] = useState(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      notificationManager.warning('Please enter a prompt first');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('');
    setTokens(0);
    setGenerationTime(null);

    const startTime = Date.now();
    
    // Use show instead of loading
    const loadingToast = notificationManager.show({
      type: 'ai',
      description: 'Generating text...',
      showProgress: true,
      duration: 0
    });

    try {
      const response = await generateText(input);
      const endTime = Date.now();
      
      // Track the generation
      trackGeneration('text');
      
      setOutput(response.text);
      setTokens(response.usage.total_tokens);
      setGenerationTime(endTime - startTime);
      
      notificationManager.remove(loadingToast);
      notificationManager.success('Text generated successfully!', {
        description: `Generated in ${((endTime - startTime) / 1000).toFixed(2)}s`,
        icon: CheckCircle
      });
    } catch (err) {
      setError(err.message);
      notificationManager.remove(loadingToast);
      notificationManager.error('Failed to generate text', {
        description: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        notificationManager.success('Content copied to clipboard');
      } catch (err) {
        notificationManager.error('Failed to copy to clipboard');
      }
    }
  };

  const handleDownload = () => {
    if (!output) return;

    const content = `# Generated Content
Generated with: GPT-3.5
Date: ${new Date().toLocaleString()}
Tokens Used: ${tokens}
Generation Time: ${generationTime ? `${(generationTime / 1000).toFixed(2)}s` : 'N/A'}
Prompt: ${input}

${output}`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-content-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    notificationManager.success('Content downloaded as Markdown');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Model Info */}
      <div className="bg-white dark:bg-dark-paper rounded-xl shadow-sm p-6 mb-6 border border-gray-100 dark:border-dark-border">
        <div className="flex items-center space-x-3">
          <Bot className="h-6 w-6 text-primary-500" />
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
              GPT-3.5
              <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400">
                FAST
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Fast and efficient text generation</p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-dark-paper rounded-xl shadow-sm p-6 mb-6 border border-gray-100 dark:border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold dark:text-white">Prompt</h3>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-border border dark:border-dark-border focus:ring-2 focus:ring-primary-500 resize-none h-32 dark:text-white"
          disabled={isLoading}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Area */}
      {output && (
        <div className="bg-white dark:bg-dark-paper rounded-xl shadow-sm p-6 border border-gray-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Generated Output</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                title="Copy content"
              >
                <Copy className="h-5 w-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                title="Download as Markdown"
              >
                <Download className="h-5 w-5" />
              </button>
              {tokens > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-border px-2 py-1 rounded-full">
                  {tokens} tokens
                </span>
              )}
              {generationTime && (
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-border px-2 py-1 rounded-full">
                  {(generationTime / 1000).toFixed(2)}s
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-dark-border rounded-lg p-4">
            <p className="whitespace-pre-wrap dark:text-white">{output}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;