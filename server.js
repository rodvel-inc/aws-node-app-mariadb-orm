const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // Reemplaza mongoose con mysql2
const sequelize = require('./config/database'); // Importar la configuración de la base de datos
const bodyParser = require('body-parser'); // Middleware para analizar el cuerpo de las solicitudes HTTP
const User = require('./models/user'); // Importar el modelo de usuario
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Verificar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL with Sequelize!');
    })
    .catch(err => {
        console.error('Unable to connect to MySQL:', err.message);
    });

// Sincronizar el modelo de usuario con la base de datos (crea la tabla si no existe)
User.sync();

    // Configuración del motor de vistas
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos y analizar datos del formulario
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })); // Analiza los datos del formulario
app.use(bodyParser.json()); // Para datos enviados en formato JSON, como en pruebas desde Postman

// Rutas
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' }); // Renderiza la página de inicio
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' }); // Renderiza la página "About Us"
});

app.post('/add-user', async (req, res) => {
    const { name, email } = req.body; // Obtener los datos del formulario

    if (!name || !email) {
        return res.status(400).send('Name and email are required'); // Validación simple para evitar datos faltantes
    }

    try {
        const newUser = await User.create({ name, email }); // Crear y guardar un nuevo usuario
        res.status(201).send('User added successfully');
    } catch (err) {
        console.error('Error adding user:', err.message);
        res.status(400).send('Error adding user');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
