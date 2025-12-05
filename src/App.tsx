import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import { Product, BlogPost, ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>('shop');

  const handleViewProduct = (product: Product) => {
    console.log('Viewing product:', product);
  };

  const handleViewArticle = (article: BlogPost) => {
    console.log('Viewing article:', article);
  };

  const handleChangeView = (newView: ViewState) => {
    setView(newView);
  };

  return (
    <HomePage
      onViewProduct={handleViewProduct}
      onViewArticle={handleViewArticle}
      onChangeView={handleChangeView}
    />
  );
}

export default App;
