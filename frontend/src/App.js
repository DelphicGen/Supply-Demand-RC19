import React from 'react';
import logo from './logo.svg';
import './App.css';
import './tailwind.css'

function App() {
  return (
    <div className="App">
      <header className="App-header bg-gray-200">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-gray-700">
          Edit <code className="text-indigo-800">src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
