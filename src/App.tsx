import React, { useEffect } from 'react';
import './Stylesheets/CSS/App.css';
import { CardContainer } from './Components/CardContainer/CardContainer';

function App() {
  useEffect(() => {
    document.title = 'Hatchaway Mockup'
  }, [])

  return (
    <div className="layout">
      <CardContainer />
    </div>
  );
}

export default App;
