//Importo los modulos que voy a utilizar.
const ip = require('ip');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const calculadora = require(path.join(__dirname , '/src/calculadora.js'));

const app = express();
const puerto = 4040; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/client/')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/client/views/'));

app.get('/sumar', (req, res) => {
    let input = req.query;
    let output = jsonResponce(
        calculadora.sumar ,
        input,
        errMSj('suma', 'parámetros incorrectos')
    );
    res.send(output);
});

app.get('/restar', (req, res) => {
    let input = req.query;
    let output = jsonResponce(
        calculadora.restar,
        input,
        errMSj('resta', 'parámetros incorrectos')
    );
    res.send(output);
});

app.get('/multiplicar', (req, res) => {
    let input = req.query;
    let output = jsonResponce(
        calculadora.multiplicar,
        input,
        errMSj('multiplicación', 'parámetros incorrectos')
    );
    res.send(output);
});

app.get('/dividir', (req, res) => {
    let input = req.query;
    let msjDeError = 'parámetros incorrectos';
    if(input.num2 == 0 && input.num1 != '' && input.num2 != ''){
        input.num2 = null;
        msjDeError = 'no se puede dividir por 0';
    }
    let output = jsonResponce(
        calculadora.dividir,
        input,
        errMSj('división', msjDeError)
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

app.listen(puerto, err => {
    if(!err){
        console.log(`Server running at http://${ip.address()}:${puerto}`);
    } else {
        console.log(`Error: ${err}`);
    }
});

/****************************************************************/

/** Valida la entrada de datos.
 * @param {object} input Entrada de datos, del tipo: {
 *                                                     num1: { number }
 *                                                     num2: { number }
 *                                                   }
 * @returns {boolean} Retornara true si la entrada de datos en valida, false en caso contrario.
 */
const inputValido = (input) => {
    if(!input.num1 || !input.num2){
        return false;
    } else {
        return true;
    }
}

/** Crea un objeto a partir de los datos provistos y lo convierte en una cadena de texto JSON.
 * @param {function} func Funcion encargada de transformar los datos ingresados. Se le ingresaran
 *                        como parametros dos numeros y se esperara como retorno un numero.
 * @param {object} datos Objeto del tipo: {
 *                                          num1: { number }
 *                                          num2: { number }
 *                                        }
 * @param {string} errMsj String que representa un mensaje de error en caso de que los datos de
 *                        entrada sea invalidos.
 * @returns {JSON} Retornara un JSON que tendra dos campos, err que sera null si datos es invalido
 *                 errMsj en caso contrario, y data que null si es invalido o un numero en caso
 *                 contrario.
 *                 {
 *                   "err": { String }
 *                   "data": { number }
 *                 }
 */
const jsonResponce = (func, datos, errMsj) => {
    const obj = { err: null, data: null };
    if(inputValido(datos)){
        obj.data = func(datos.num1, datos.num2);
    } else {
        obj.err = errMsj;
    }
    return JSON.stringify(obj);
};

const errMSj = (accion, causa) => {
    return `No se pudo realizar la ${accion}, ${causa}`;
}