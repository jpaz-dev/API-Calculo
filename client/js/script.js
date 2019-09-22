const output = document.getElementById('resultado');

const llamarAPICalculator = (direccion, valor1, valor2) => {
    const request = new XMLHttpRequest();

    request.onload = () => {
        let res = JSON.parse(request.responseText);
        output.textContent = !res.err ? res.data : res.err;
    };

    request.open('GET', `${direccion}?num1=${valor1}&num2=${valor2}`);
    request.send();
};

const sumar = () => {
    let num1 = document.getElementById('num1').value;
    let num2 = document.getElementById('num2').value;

    llamarAPICalculator('/sumar', num1, num2);
};

const restar = () => {
    let num1 = document.getElementById('num1').value;
    let num2 = document.getElementById('num2').value;

    llamarAPICalculator('/restar', num1, num2);
};

const dividir = () => {
    let num1 = document.getElementById('num1').value;
    let num2 = document.getElementById('num2').value;

    llamarAPICalculator('/dividir', num1, num2);
};

const multiplicar = () => {
    let num1 = document.getElementById('num1').value;
    let num2 = document.getElementById('num2').value;

    llamarAPICalculator('/multiplicar', num1, num2);
};