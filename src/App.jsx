import './App.scss';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import BackgroundLines from './components/BackgroundLines/BackgroundLines';
import ParticlesPlane from './components/ParticlesPlane/ParticlesPlane';

function App() {
  return (
    <>
      <Header logoLink='#' />
      <MainContent buttonLink='#' title='Building the future of medicine with AI' />
      <BackgroundLines quantity={24} />
      <ParticlesPlane />
    </>
  );
}

export default App;
