import React from 'react';
import { Link } from 'react-router';

const MainPage: React.FC = () => {
  const handleModeSelect = (mode: 'customer' | 'employee') => {
    console.log(`Selected mode: ${mode}`);
    // TODO: Add navigation logic here, e.g., using React Router's useNavigate
    // Example: navigate('/customer') or navigate('/employee')
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Hotel Finder
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Please select your mode to continue:
        </p>
        <div className="space-y-4">
          <button
            onClick={() => handleModeSelect('customer')}
            className="w-full max-w-xs px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Customer Mode
          </button>
          <button
            onClick={() => handleModeSelect('employee')}
            className="w-full max-w-xs px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            Employee Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;