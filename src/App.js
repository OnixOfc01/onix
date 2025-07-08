import React, { useState, useEffect } from 'react';
import AuthLogin from './components/AuthLogin';
import DashboardHome from './components/DashboardHome';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); // 'login' o 'dashboard'
  const [loggedInUser, setLoggedInUser] = useState(null);

  // ⬇️ Detectar sesión al cargar la app
  useEffect(() => {
    const userFromStorage = localStorage.getItem('usuario');
    if (userFromStorage) {
      setLoggedInUser(userFromStorage);
      setCurrentPage('dashboard');
    }
  }, []);

  // ⬇️ Al iniciar sesión
  const handleLoginSuccess = (username) => {
    localStorage.setItem('usuario', username); // guardar sesión
    setLoggedInUser(username);
    setCurrentPage('dashboard');
  };

  // ⬇️ Al cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario'); // borrar sesión
    setLoggedInUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'login' && <AuthLogin onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'dashboard' && <DashboardHome username={loggedInUser} onLogout={handleLogout} />}
    </div>
  );
};

export default App;
