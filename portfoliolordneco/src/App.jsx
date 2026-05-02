import React, { useState, useEffect } from 'react';
import './App.scss';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import TechStack from './components/TechStack/TechStack';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Remove o timer automático - agora quem controla é o SplashScreen
    // O SplashScreen vai chamar uma função quando completar
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;