const sumar = arr => arr.reduce((x, y) => { return x + y });
const restar = arr => arr.reduce((x, y) => { return x - y });
const multiplicar = arr => arr.reduce((x, y) => { return x * y });
const dividir = arr => arr.reduce((x, y) => { return x / y });

module.export = {sumar, restar, multiplicar, dividir};