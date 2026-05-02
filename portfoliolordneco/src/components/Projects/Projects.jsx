import React, { useState } from 'react';
import './Projects.scss';

function Projects() {
  const [imageErrors, setImageErrors] = useState({});

  const projects = [
    {
      id: 1,
      nome: 'Desafio Final Connect',
      descricao: 'Projeto final do curso Connect, um site completo com funcionalidades modernas e design responsivo.',
      imagem: '/imagensprojetos/desafiofinal.png',
      fallback: '🚀',
      githubLink: 'https://github.com/LordNecoReal/DesafioFinalConnectOswaldo',
      liveLink: 'https://desafiofinalconnectoswaldo.vercel.app/'
    },
    {
      id: 2,
      nome: 'Calculadora Rock',
      descricao: 'Uma calculadora temática de rock com design estilizado e funcionalidades completas de cálculos matemáticos.',
      imagem: '/imagensprojetos/calculadorarock.png',
      fallback: '🎸',
      githubLink: 'https://github.com/LordNecoReal/calculadoraRock',
      liveLink: 'https://calculadorarock.vercel.app/'
    },
    {
      id: 3,
      nome: 'Árvore Natalina',
      descricao: 'Um projeto festivo com animações interativas de árvore de Natal, ideal para celebrações e decorações digitais.',
      imagem: '/imagensprojetos/arvorenatalina.png',
      fallback: '🎄',
      githubLink: 'https://github.com/LordNecoReal/arvorenatalina2025',
      liveLink: 'https://arvorenatalina2025.vercel.app/'
    },
   
    {
      id: 4,
      nome: 'Recicla Tech',
      descricao: 'Iniciativa sustentável para reciclagem de eletrônicos, conscientizando sobre descarte correto e pontos de coleta.',
      imagem: '/imagensprojetos/reciclatech.png',
      fallback: '♻️',
      githubLink: 'https://github.com/LordNecoReal/reciclatechlord',
      liveLink: 'https://reciclatechlord.vercel.app/'
    },
   
  ];

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <section id="projetos" className="projects section-transition">
      <div className="container">
        <h2 className="section-title">Projetos</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {!imageErrors[project.id] ? (
                  <img 
                    src={project.imagem} 
                    alt={project.nome}
                    className="project-img"
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <span className="project-emoji">{project.fallback}</span>
                )}
              </div>
              <div className="project-info">
                <h3 className="project-name">{project.nome}</h3>
                <p className="project-description">{project.descricao}</p>
                <div className="project-buttons">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-button github-btn"
                  >
                    📦 GitHub
                  </a>
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-button live-btn"
                  >
                    🌐 Ver Site
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;