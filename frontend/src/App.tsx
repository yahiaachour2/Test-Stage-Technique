import './App.css';

import React from 'react';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Content from './components/Content';
import Create from './components/CreateOrUpdateDocument';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className='flex h-100'>
          <Sidebar />
          <div className='flex-5'>
            <Routes>
              <Route path="/" element={
                <div className='h-100'>
                  <Content />
                </div>
              } />
              <Route path="document" element={<Create />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
