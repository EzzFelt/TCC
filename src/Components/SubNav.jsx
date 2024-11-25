import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/SubNav.css';

const SubNavbar = () => {
  return (
    <nav className="subnavbar">
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/exercises" activeClassName="active">
            Exercícios
          </NavLink>
        </li>
        <li>
          <NavLink to="/consults" activeClassName="active">
            Consultas
          </NavLink>
        </li>
        {/* Adicione outros links conforme necessário */}
      </ul>
    </nav>
  );
};

export default SubNavbar;
