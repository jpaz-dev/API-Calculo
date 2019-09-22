const ip = require('ip');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const calculadora = require(path.join(__dirname , '/src/calculadora.js'));

const app = express();
const puerto = 4040;

const inputValido = (input) => {
    if(!input.num1 || !input.num2){
        return false;
    } else {
        return true;
    }
}

const jsonResponce = (func, datos, errMsj) => {
    const obj = { err: null, data: null };
    if(inputValido(datos)){
        obj.data = func(datos.num1, datos.num2);
    } else {
        obj.err = errMsj;
    }
    console.log(datos);
    console.log(obj);
    return JSON.stringify(obj);
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/client/')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/client/views/'));

app.get('/sumar', (req, res) => {
    let input = req.query;
    let output = jsonResponce(
        calculadora.sumar ,
        input,
        'No se ha podido realizar la suma, intentelo de nuevo.'
    );
    res.send(output);
});

app.get('/restar', (req, res) => {
    let input = req.query;
    let output = jsonResponce(
        calculadora.restar,
        input,
        'No se ha podido realizar la resta, intentelo de nuevo.'
    );
    res.send(output);
});

app.get('/multiplicar', (req, res) => {
    let input = req.query;
    let output = jsonResponce(
        calculadora.multiplicar,
        input,
        'No se ha podido realizar la multiplicacion, intentelo de nuevo.'
    );
    res.send(output);
});

app.get('/dividir', (req, res) => {
    let input = req.query;
    input.num2 = input.num2 == 0? null : input.num2;
    let output = jsonResponce(
        calculadora.dividir,
        input,
        'No se ha podido realizar la division, intentelo de nuevo.'
    );
    res.send(output);
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/help', (req, res) => {
    let address = `${ip.address()}:${puerto}`;
    res.render('help', {address});
});

app.listen(puerto, (err) => {
    if(!err){
        console.log(`Escuchando en el puerto ${puerto}`);
        console.log(`Puede entrar desde: ${ip.address()}:${puerto}`);
    } else {
        console.log(`Error: ${err}`);
    }
});