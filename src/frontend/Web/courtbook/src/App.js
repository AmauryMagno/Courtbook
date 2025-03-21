import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={
            <header className="App-header">
              <p>
                Bem-vindo ao CourtBook
              </p>
              <a
                className="App-link"
                href="/cadastro"
              >
                Ir para Cadastro
              </a>
            </header>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
