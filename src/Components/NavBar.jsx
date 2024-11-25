import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Gerencia o estado do modal

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    localStorage.removeItem('user'); // Remove o usuário
    navigate('/login'); // Redireciona para a página de login
  };

  const token = localStorage.getItem('token'); // Verifica se o token está presente

  return (
    <>
      <nav className="navbar">
        <div className="navbar-item">
          <img id="Logo" src="/imgs/icon_coelho.png" alt="Logo" />
          <span>
            <img id="Run" src="/imgs/icon_reproduzir.png" alt="Rodar" />Rodar
          </span>
          <span>
            <img id="Save" src="/imgs/icon_save.png" alt="Salvar" />Salvar
          </span>
        </div>
        <div className="navbar-item">
          <span>
            <img id="Config" src="/imgs/icon_config.png" alt="Configurações" />Configurações
          </span>
          {token ? (
            <button onClick={() => setShowModal(true)} className="logout-button">
              Sair
            </button>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
        </div>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Você realmente deseja sair?</h3>
            <div className="modal-buttons">
              <button className="btn-logout" onClick={handleLogout}>
                Sair
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Ficar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
