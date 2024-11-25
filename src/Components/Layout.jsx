import React from 'react';
import Sidebar from './SideBar';
import MainContent from './MainContent';
import '../Styles/Layout.css'; 

const Layout = () => {
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Layout;