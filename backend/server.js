const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MongoDB Atlas

const uri = "mongodb+srv://onix1751:onix1751@onix-proyect.5fgmndn.mongodb.net/onixdb?retryWrites=true&w=majority&appName=onix-proyect";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let usersCollection;

// Función para sincronizar la colección con el archivo usuarios.json
async function syncUsersToFile() {
  try {
    const users = await usersCollection.find({}).toArray();
    fs.writeFileSync('usuarios.json', JSON.stringify(users, null, 2));
    console.log('Archivo usuarios.json sincronizado con MongoDB');
  } catch (error) {
    console.error('Error sincronizando usuarios.json:', error);
  }
}

async function startServer() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB Atlas correctamente.");

    const db = client.db('onixdb'); // Cambia 'onixdb' si quieres
    usersCollection = db.collection('usuarios');

    // Registro
    app.post('/register', async (req, res) => {
      try {
        const newUser = req.body;

        const exists = await usersCollection.findOne({ username: newUser.username });
        if (exists) {
          return res.status(400).json({ message: 'El usuario ya está registrado.' });
        }

        await usersCollection.insertOne(newUser);
        await syncUsersToFile(); // sincronizar archivo local

        res.status(201).json({ message: 'Usuario registrado correctamente.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
      }
    });

    // Login
    app.post('/login', async (req, res) => {
      try {
        const { username, password } = req.body;

        const user = await usersCollection.findOne({ username, password });
        if (!user) return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });

        res.json({ message: 'Login exitoso', username: user.username });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
      }
    });

    // Obtener todos los usuarios (opcional)
    app.get('/users', async (req, res) => {
      try {
        const users = await usersCollection.find({}).toArray();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Backend corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
  }
}

startServer();
