import React, { useState } from 'react';

const BACKEND_URL = 'https://onix-backend-0sfs.onrender.com';

function AuthLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
      setError('Completa usuario y contraseña.');
      return;
    }
    try {
      const res = await fetch(BACKEND_URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Error al iniciar sesión');
        return;
      }

      const data = await res.json();
      onLoginSuccess(data.username);
    } catch (e) {
      setError('Error de conexión con el servidor.');
    }
  };

  const handleRegister = async () => {
    setError('');
    if (!email || !username || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const res = await fetch(BACKEND_URL + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Error al registrar');
        return;
      }

      alert('¡Usuario registrado correctamente! Bienvenido a ONIX');
      onLoginSuccess(username);
    } catch (e) {
      setError('Error de conexión con el servidor.');
    }
  };

  return React.createElement(
    'div',
    { className: 'flex flex-col items-center justify-center min-h-screen bg-black p-4' },
    React.createElement(
      'div',
      {
        className:
          'relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-700',
      },
      React.createElement(
        'div',
        { className: 'relative z-10' },
        React.createElement(
          'h2',
          { className: 'text-4xl font-extrabold text-center text-white mb-8' },
          '¡BIENVENIDO A ONIX!'
        ),
        !isRegistering
          ? React.createElement(
              React.Fragment,
              null,
              React.createElement('input', {
                type: 'text',
                placeholder: 'Usuario',
                className: 'w-full px-5 py-3 mb-4 border bg-gray-700 text-white rounded-xl',
                value: username,
                onChange: (e) => setUsername(e.target.value),
              }),
              React.createElement('input', {
                type: 'password',
                placeholder: 'Contraseña',
                className: 'w-full px-5 py-3 mb-6 border bg-gray-700 text-white rounded-xl',
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }),
              error &&
                React.createElement(
                  'p',
                  { className: 'text-red-400 text-center mb-4' },
                  error
                ),
              React.createElement(
                'button',
                {
                  onClick: handleLogin,
                  className: 'w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700',
                },
                'Entrar'
              ),
              React.createElement(
                'p',
                { className: 'text-center text-gray-400 mt-6' },
                '¿No tienes cuenta? ',
                React.createElement(
                  'button',
                  {
                    onClick: () => setIsRegistering(true),
                    className: 'text-indigo-400 hover:underline',
                  },
                  '¡Regístrate aquí!'
                )
              )
            )
          : React.createElement(
              React.Fragment,
              null,
              React.createElement('input', {
                type: 'email',
                placeholder: 'Correo electrónico',
                className: 'w-full px-5 py-3 mb-4 border bg-gray-700 text-white rounded-xl',
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }),
              React.createElement('input', {
                type: 'text',
                placeholder: 'Usuario',
                className: 'w-full px-5 py-3 mb-4 border bg-gray-700 text-white rounded-xl',
                value: username,
                onChange: (e) => setUsername(e.target.value),
              }),
              React.createElement('input', {
                type: 'password',
                placeholder: 'Contraseña',
                className: 'w-full px-5 py-3 mb-6 border bg-gray-700 text-white rounded-xl',
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }),
              error &&
                React.createElement(
                  'p',
                  { className: 'text-red-400 text-center mb-4' },
                  error
                ),
              React.createElement(
                'button',
                {
                  onClick: handleRegister,
                  className: 'w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 mb-2',
                },
                'Registrarse'
              ),
              React.createElement(
                'p',
                { className: 'text-center text-gray-400 mt-6' },
                '¿Ya tienes cuenta? ',
                React.createElement(
                  'button',
                  {
                    onClick: () => setIsRegistering(false),
                    className: 'text-indigo-400 hover:underline',
                  },
                  '¡Inicia sesión!'
                )
              )
            )
      )
    )
  );
}

export default AuthLogin;
