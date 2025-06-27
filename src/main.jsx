import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'; 
import Home from './pages/Home';
import AllLessons from './pages/AllLessons';
import LessonDetails from './pages/LessonDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<AllLessons />} />
        <Route path="/lesson/:id" element={<LessonDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
