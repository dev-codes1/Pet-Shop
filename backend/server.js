require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(
    cors({
      origin: 'http://localhost:3000', // Cambia esto si tu FrontEnd está en otro dominio
        methods: ['GET', 'POST'],
        credentials: true,
    })
);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


// Rutas
app.use('/api/auth', authRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
