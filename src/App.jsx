import { useState } from 'react';
import Display from './Components/Display/Display';
import Button from './Components/Button/Button';

import './App.css';

function App() {

  return (
    <>
    <div className="App">
      <Display />
      <h2>Add New User</h2>
      <Button/>
    </div>
    </>
  );
}

export default App;