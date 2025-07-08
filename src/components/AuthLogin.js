import React, { useState } from 'react';

const AuthLogin = ({ onLoginSuccess }) => {
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
      const res = await fetch('/login', {  // <-- aquí la URL es relativa
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
    } catch {
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
      const res = await fetch('/register', {  // <-- también relativa
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
    } catch {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-700">

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-center text-white mb-8">¡BIENVENIDO A ONIX!</h2>
          {!isRegistering ? (
            <>
              <input
                type="text"
                placeholder="Usuario"
                className="w-full px-5 py-3 mb-4 border bg-gray-700 text-white rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-5 py-3 mb-6 border bg-gray-700 text-white rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-400 text-center mb-4">{error}</p>}
              <button
                onClick={handleLogin}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700"
              >
                Entrar
              </button>
              <p className="text-center text-gray-400 mt-6">
                ¿No tienes cuenta?{' '}
                <button onClick={() => setIsRegistering(true)} className="text-indigo-400 hover:underline">
                  ¡Regístrate aquí!
                </button>
              </p>
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-5 py-3 mb-4 border bg-gray-700 text-white rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Usuario"
                className="w-full px-5 py-3 mb-4 border bg-gray-700 text-white rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-5 py-3 mb-6 border bg-gray-700 text-white rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-400 text-center mb-4">{error}</p>}
              <button
                onClick={handleRegister}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 mb-2"
              >
                Registrarse
              </button>
              <p className="text-center text-gray-400 mt-6">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => setIsRegistering(false)} className="text-indigo-400 hover:underline">
                  ¡Inicia sesión!
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
