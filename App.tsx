import React from 'react';
import CalculatorWidget from './components/CalculatorWidget';

// This App component simulates the host page. 
// In a real embed scenario, only <CalculatorWidget /> would be rendered into the target div.
const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      {/* 
        The CalculatorWidget is the standalone component. 
        It is designed to fill the width of its container.
      */}
      <div className="w-full max-w-5xl">
        <CalculatorWidget />
      </div>
    </div>
  );
};

export default App;