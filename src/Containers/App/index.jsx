import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Home from '../../Pages/Home';
import Consults from '../../Pages/Consults';
import Exercises from '../../Pages/Exercises';
import Navbar from '../../Components/NavBar';
import SubNavbar from '../../Components/SubNav';
import Lesson1 from '../../Lessons/Lesson1';
import Lesson2 from '../../Lessons/Lesson2';
import Lesson3 from '../../Lessons/Lesson3';
import Login from '../../Pages/Login';
import Signup from '../../Pages/Signup';
import ResetPassword from '../../Pages/ResetPassword';

// Layout para páginas que incluem Navbar e SubNavbar
const MainLayout = ({ user, logout }) => (
  <>
    <Navbar user={user} logout={logout} />
    <SubNavbar />
    <Outlet />
  </>
);

const App = () => {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado

  // Recupera o usuário do localStorage quando a aplicação é carregada
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name && parsedUser.token) {
          parsedUser.lessonsCompleted = parsedUser.lessonsCompleted || 0; // Valor padrão se necessário
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Erro ao analisar usuário no localStorage:', error);
      }
    }
  }, []);

  // Função para fazer o login
  const handleLogin = (userData) => {
    if (userData && userData.name && userData.token) {
      console.log('Dados recebidos do backend:', userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Armazena os dados completos
      localStorage.setItem('token', userData.token);           // Armazenar apenas o token
      setUser(userData);                                       // Atualiza o estado do usuário
      console.log('Usuário logado com sucesso:', userData);     // Confirmação de login
    } else {
      console.error('Dados do usuário são inválidos ou incompletos:', userData); // Log do erro com os dados
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    setUser(null); // Remove o usuário logado
    localStorage.removeItem('user'); // Remove o usuário do localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Rotas de Login, Signup e ResetPassword */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Roteamento principal com Navbar e SubNavbar */}
        <Route element={<MainLayout user={user} logout={handleLogout} />}>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/consults" element={<Consults />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/lessons/lesson1" element={<Lesson1 />} />
          <Route path="/lessons/lesson2" element={<Lesson2 />} />
          <Route path="/lessons/lesson3" element={<Lesson3 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
