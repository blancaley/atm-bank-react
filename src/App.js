import { useState, useEffect } from 'react';
import './App.css';
import Atm from './components/Atm';

function App() {
  //Toggle ATM
  const [showATM, setShowATM] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React ATM 2.0</h1>
        <button
          onClick={()=> setShowATM(!showATM)}>
          {showATM ? "Hide ATM" : "Show ATM"} 
        </button>
        {showATM && <Atm/>}
      </header>
    </div>
  );
}

export default App;
