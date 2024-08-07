import { useState } from 'react';
import Display from './Components/Display/Display';
import Button from './Components/Button/Button';
import Link from './Components/Link/Link';
import Logo from './Components/Logos/Logo';


import './App.css';

function App() {

  return (
    <>
    <div className="App">
      <Logo />
      <Display />
      <Button/>
      <Link/>
    </div>
    </>
  );
}

export default App;