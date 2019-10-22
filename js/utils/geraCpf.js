/**
 * @function geraCpf
 * @category Utils
 * @class
 * @description - Gera um CPF válido
 * @param {boolean} [comMascara = false] - **Opcional** Se o parâmetro for "true" o CPF será gerado com máscara. Caso não seja informado, o padrão é gerar CPF sem máscara.
 * @example 
 * const util = require("./node_modules/usealltestframework/js/page_objects/util");
 * var cpf = util.geraCpf();
 * @author Cássio
*/
function geraCpf(comMascara = false) {
    var n = 9;
    var random = Math.round(Math.random() * n);
    var n1 = random;
    var n2 = random;
    var n3 = random;
    var n4 = random;
    var n5 = random;
    var n6 = random;
    var n7 = random;
    var n8 = random;
    var n9 = random;
    var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (Math.round(d1 - (Math.floor(d1 / 11) * 11)));
    if (d1 >= 10) d1 = 0;
    var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (Math.round(d2 - (Math.floor(d2 / 11) * 11)));
    if (d2 >= 10) d2 = 0;

    if (comMascara)
        return '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
    else
        return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
};