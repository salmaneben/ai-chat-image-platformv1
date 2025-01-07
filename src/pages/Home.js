import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            AI Content Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create amazing content using the power of artificial intelligence
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Text Generation</h2>
            <p className="text-gray-600">
              Generate high-quality text content using advanced AI models
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Image Generation</h2>
            <p className="text-gray-600">
              Create unique images from text descriptions powered by AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;