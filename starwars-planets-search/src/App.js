import React from 'react';
import './App.css';
import Options from './components/Options';
import Table from './components/Table';
import StarProvider from './context/StarProvider';

function App() {
  return (
    <div className="App">
      <StarProvider>
        <Options />
        <Table />
      </StarProvider>
    </div>
  );
}

export default App;
