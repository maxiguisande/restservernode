require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuarios'));

mongoose.connect(process.env.URLDB, config,
    (err) => {
        if (err) throw err;
        console.log('Base de Datos ONLINE!!');
    });


app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto 3000");
});