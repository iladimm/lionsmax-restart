import React, { useState } from 'react';
import UnderConstruction from './pages/UnderConstruction';
import HomePage from './pages/HomePage';
import MetaTags from './components/seo/SEO';

type ViewState = 'under-construction' | 'home';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('under-construction'); // DEFAULT: Under Construction

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MetaTags />
      {currentView === 'under-construction' && <UnderConstruction />}
      {currentView === 'home' && <HomePage />}
    </div>
  );
}

export default App;
