import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProductPage from './components/Products';
import HomePage from './components/Home';
import './App.css';
import DefaultLayout from './components/containers/DefaultLayout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={< HomePage />} />         
          <Route path="products" element={<ListProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
