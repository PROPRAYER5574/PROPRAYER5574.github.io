const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Nombre: ${name}, Correo Electrónico: ${email}, Mensaje: ${message}`);
    res.send('Formulario recibido');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});