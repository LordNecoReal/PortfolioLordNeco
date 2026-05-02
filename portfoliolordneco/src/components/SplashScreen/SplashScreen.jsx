import React, { useState, useEffect, useRef } from 'react';
import './SplashScreen.scss';

function SplashScreen({ onComplete }) {
  const [position, setPosition] = useState(0);
  const [eatenDots, setEatenDots] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const totalDots = 25;
  const totalTime = 8000;
  const trackWidth = 340;
  const pacmanWidth = 45;
  const maxPosition = trackWidth - pacmanWidth;

  // Posições fixas das bolinhas
  const dotPositions = [];
  for (let i = 0; i < totalDots; i++) {
    dotPositions.push(20 + (i * (trackWidth - 40) / (totalDots - 1)));
  }

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(elapsed / totalTime, 1);
      setProgress(newProgress * 100);
      
      // Posição do Pacman
      const newPosition = newProgress * maxPosition;
      setPosition(newPosition);
      
      // Centro do Pacman (onde fica a boca)
      const pacmanCenter = newPosition + pacmanWidth / 2;
      
      // Verifica cada bolinha individualmente
      dotPositions.forEach((dotX, index) => {
        // Se a bolinha ainda não foi comida
        if (!eatenDots.includes(index)) {
          // Distância entre o Pacman e a bolinha
          const distance = Math.abs(pacmanCenter - dotX);
          // Se encostou (distância menor que o raio da bolinha + raio do Pacman)
          if (distance < 12) {
            setEatenDots(prev => [...prev, index]);
          }
        }
      });
      
      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Garante que todas foram comidas
        if (eatenDots.length < totalDots) {
          setEatenDots([...Array(totalDots).keys()]);
        }
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 100);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [eatenDots, dotPositions, maxPosition, onComplete]);

  return (
    <div className={`splash-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-icons">
          <span className="splash-icon rocket">🚀</span>
          <span className="splash-icon joystick">🎮</span>
        </div>
        <div className="splash-logo">
          <span className="splash-text">Portfólio</span>
          <span className="splash-name">Lord Neco</span>
        </div>

        <div className="pacman-container">
          <div className="pacman-track">
            <div className="pacman-wrapper">
              <div 
                className="pacman-moving" 
                style={{ transform: `translateX(${position}px)` }}
              >
                <div className="pacman">
                  <div className="pacman-eye"></div>
                </div>
              </div>
            </div>
            <div className="dots-line">
              {dotPositions.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${eatenDots.includes(index) ? 'eaten' : ''}`}
                  style={{
                    left: `${dotPositions[index]}px`,
                    position: 'absolute'
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>

        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${Math.floor(progress)}%` }}></div>
          </div>
          <p className="progress-text">{Math.floor(progress)}% carregado</p>
        </div>

        <p className="splash-subtitle">Carregando experiências digitais...</p>
      </div>
    </div>
  );
}

export default SplashScreen;