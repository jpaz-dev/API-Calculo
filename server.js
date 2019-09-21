const path = require('path');
const express = require('express');
const calculadora = require(path.join(__dirname, 'src/js/calculo.js'));

const api = express();
const puerto = 4040;

const jsonResponce = (errString, dataInt) => {
    const obj = {
        err: errString,
        data: dataInt
    };
    return JSON.stringify(obj);
};

app.use(bodyParser.urlencoded({ extended: true }));

api.post('/sumar', (req, res) => {
    const input = req.body;
    let suma = calculadora.sumar(input);
    res.send(
        jsonResponce(`No se pudo realizar la suma de ${input.toString}`),
        suma
    );
});

api.post('/restar', (req, res) => {
    const input = req.body;
    let resta = calculadora.restar(input);
    res.send(
        jsonResponce(`No se pudo realizar la resta de ${input.toString}`),
        resta
    );
});

api.post('/multiplicar', (req, res) => {
    const input = req.body;
    let multiplicacion = calculadora.multiplicar(input);
    res.send(
        jsonResponce(`No se pudo realizar la multiplicacion de ${input.toString}`),
        multiplicacion
    );
});

api.post('/dividir', (req, res) => {
    const input = req.body;
    let division = calculadora.dividir(input);
    res.send(
        jsonResponce(`No se pudo realizar la suma de ${input.toString}`),
        division
    );
});

app.listen(puerto, (err) => {
    if(!err){
        console.log(`Escuchando en el puerto ${puerto}`);
    } else {
        console.log(`Error: ${err}`);
    }
});