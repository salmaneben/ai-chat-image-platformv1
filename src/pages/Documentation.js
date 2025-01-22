import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { 
  CloudIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CommandLineIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Documentation = () => {
  const firebaseConfigCode = `// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  app = window.firebase?.apps?.[0] || initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();`;

  const authServiceCode = `// src/services/firebase.js
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const userData = {
    uid: result.user.uid,
    email: result.user.email,
    name: result.user.displayName,
    photoURL: result.user.photoURL,
    token: await result.user.getIdToken()
  };
  localStorage.setItem('user', JSON.stringify(userData));
  return userData;
};`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Chat/Image Platform Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Version 1.0 | Technical Reference & Implementation Guide
          </p>
        </div>

        {/* Architecture Section */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <CpuChipIcon className="h-8 w-8 text-blue-500 mr-2" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              System Architecture
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <pre className="whitespace-pre-wrap text-sm dark:text-gray-300">
              {`Frontend (React)
├── Components
├── Redux Store
├── Firebase Auth
└── API Services

Backend (Node.js/Express)
├── FAL AI Integration
├── Authentication
├── Rate Limiting
└── Error Handling`}
            </pre>
          </div>
        </section>

        {/* Firebase Integration */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <CloudIcon className="h-8 w-8 text-blue-500 mr-2" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Firebase Implementation
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                Configuration
              </h3>
              <SyntaxHighlighter language="javascript" className="rounded-lg">
                {firebaseConfigCode}
              </SyntaxHighlighter>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                Authentication Service
              </h3>
              <SyntaxHighlighter language="javascript" className="rounded-lg">
                {authServiceCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <ShieldCheckIcon className="h-8 w-8 text-green-500 mr-2" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Security Measures
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-3 dark:text-white">
                🔒 Authentication
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Google OAuth 2.0</li>
                <li>• JWT Token Validation</li>
                <li>• Session Encryption</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-3 dark:text-white">
                🛡️ Protection
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• CORS Policy Enforcement</li>
                <li>• Rate Limiting</li>
                <li>• CSRF Protection</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-3 dark:text-white">
                📜 Policies
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• 24hr Session Expiry</li>
                <li>• 30min Inactivity Logout</li>
                <li>• GDPR Compliance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI Services Documentation */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <CommandLineIcon className="h-8 w-8 text-purple-500 mr-2" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              AI Services
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                Image Generation
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Endpoint:</span>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    POST /api/generate
                  </code>
                </div>
                <SyntaxHighlighter language="javascript" className="rounded-lg">
                  {`{
  prompt: "A sunset over mountains",
  imageSize: "landscape_4_3",
  numSteps: 4
}`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                Text Generation
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Model:</span>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    GPT-3.5 Turbo
                  </code>
                </div>
                <SyntaxHighlighter language="javascript" className="rounded-lg">
                  {`const response = await generateText(prompt);`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
          <div className="flex items-center mb-6">
            <CodeBracketIcon className="h-8 w-8 text-blue-500 mr-2" />
            <h2 className="text-2xl font-semibold dark:text-white">
              Development Setup
            </h2>
          </div>
          
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-medium mb-2">1. Install dependencies:</p>
              <SyntaxHighlighter language="bash" className="rounded-lg">
                npm install @fal-ai/client firebase @heroicons/react react-redux @reduxjs/toolkit
              </SyntaxHighlighter>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-medium mb-2">2. Environment variables:</p>
              <SyntaxHighlighter language="bash" className="rounded-lg">
                {`REACT_APP_FIREBASE_API_KEY=your_key_here
REACT_APP_FAL_KEY_ID=your_key_here
REACT_APP_FAL_KEY_SECRET=your_secret_here`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;