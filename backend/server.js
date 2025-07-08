const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Registro
app.post('/register', (req, res) => {
  const newUser = req.body;

  let users = [];
  if (fs.existsSync('usuarios.json')) {
    const data = fs.readFileSync('usuarios.json', 'utf-8');
    users = JSON.parse(data);
  }

  const exists = users.find(u => u.username === newUser.username);
  if (exists) {
    return res.status(400).json({ message: 'El usuario ya está registrado.' });
  }

  users.push(newUser);
  fs.writeFileSync('usuarios.json', JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'Usuario registrado correctamente.' });
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!fs.existsSync('usuarios.json')) return res.status(400).json({ message: 'No hay usuarios registrados.' });

  const users = JSON.parse(fs.readFileSync('usuarios.json', 'utf-8'));
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });

  res.json({ message: 'Login exitoso', username: user.username });
});

// Obtener todos los usuarios (opcional)
app.get('/users', (req, res) => {
  if (!fs.existsSync('usuarios.json')) return res.json([]);
  const users = JSON.parse(fs.readFileSync('usuarios.json', 'utf-8'));
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
