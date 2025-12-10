import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import MainContent from './components/MainContent';
import BackgroundLines from './components/BackgroundLines';
import ParticlesPlane from './components/ParticlesPlane';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <MainContent />
      <BackgroundLines quantity={24} />
      <ParticlesPlane />
    </>
  );
}

export default App;
