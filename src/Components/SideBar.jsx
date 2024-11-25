import React from 'react';
import '../Styles/SideBar.css';

const Sidebar = () => {
  return (
    <div className="sideBar">
     <div className="sideContent">
      <h3>Menu Ajuda</h3>
      <ul>
        <li>Funções</li>
        <li>Operadores</li>
        <li>Tipos de saída</li>
      </ul>
     </div>
    </div>
  );
};

export default Sidebar;