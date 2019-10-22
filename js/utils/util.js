// @ts-nocheck
module.exports = {

    /**
     * @function geraString
     * @category Utils
     * @class
     * @description - Gera uma string com o tamanho informado
     * @param {number} tamanho - Tamanho que a string gerada deve ter
     * @example 
     * var stringDe100Caracteres = util.geraString(100);
     * @author Cássio
    */
    geraString: function (tamanho) {
        var texto = "";
        var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < tamanho; i++)
            texto += caracteres.charAt(Math.floor(Math.random() * caracteres.length));

        return texto;
    },

    /**
     * @function geraCpf
     * @category Utils
     * @class
     * @description - Gera um CPF válido
     * @param {boolean} [comMascara = false] - **Opcional** Se o parâmetro for "true" o CPF será gerado com máscara. Caso não seja informado, o padrão é gerar CPF sem máscara.
     * @example
     * var cpf = util.geraCpf();
     * @author Cássio
    */
    geraCpf: function (comMascara = false) {
        var n = 9;
        var n1 = this._gera_random(n);
        var n2 = this._gera_random(n);
        var n3 = this._gera_random(n);
        var n4 = this._gera_random(n);
        var n5 = this._gera_random(n);
        var n6 = this._gera_random(n);
        var n7 = this._gera_random(n);
        var n8 = this._gera_random(n);
        var n9 = this._gera_random(n);
        var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
        d1 = 11 - (this._mod(d1, 11));
        if (d1 >= 10) d1 = 0;
        var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
        d2 = 11 - (this._mod(d2, 11));
        if (d2 >= 10) d2 = 0;

        if (comMascara)
            return '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
        else
            return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
    },

    /**
     * @function geraCnpj
     * @category Utils
     * @class
     * @description - Gera um CNPJ válido
     * @param {boolean} [comMascara = false] - **Opcional** Se o parâmetro for "true" o CNPJ será gerado com máscara. Caso não seja informado, o padrão é gerar CNPJ sem máscara.
     * @example 
     * var cnpj = util.geraCnpj();
     * @author Cássio
    */
    geraCnpj: function (comMascara) {
        var n = 9;
        var n1 = this._gera_random(n);
        var n2 = this._gera_random(n);
        var n3 = this._gera_random(n);
        var n4 = this._gera_random(n);
        var n5 = this._gera_random(n);
        var n6 = this._gera_random(n);
        var n7 = this._gera_random(n);
        var n8 = this._gera_random(n);
        var n9 = 0;//_gera_random(n);
        var n10 = 0;//_gera_random(n);
        var n11 = 0;//_gera_random(n);	
        var n12 = 1;//_gera_random(n);		
        var d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
        d1 = 11 - (this._mod(d1, 11));
        if (d1 >= 10) d1 = 0;
        var d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
        d2 = 11 - (this._mod(d2, 11));
        if (d2 >= 10) d2 = 0;

        if (comMascara)
            return '' + n1 + n2 + '.' + n3 + n4 + n5 + '.' + n6 + n7 + n8 + '/' + n9 + n10 + n11 + n12 + '-' + d1 + d2;
        else
            return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10 + n11 + n12 + d1 + d2;
    },

    /**
     * @function getDataFormatada
     * @category Utils
     * @class
     * @description - Retorna a data atual no formato "dd/mm/aaaa-HH:mm:ss:mls"
     * @example 
     * var data = util.getDataFormatada();
     * @author Cássio
    */
    getDataFormatada: function () {
        var today = new Date();
        var data = today.getDate().toString().padStart(2, '0')
            + '/' + (today.getMonth() + 1).toString().padStart(2, '0')
            + '/' + today.getFullYear()
            + '-' + today.getHours()
            + ':' + today.getMinutes()
            + ':' + today.getSeconds()
            + ':' + today.getMilliseconds();

        return data;
    },

    /**
     * @function getDataSimples
     * @category Utils
     * @class
     * @description - Retorna a data atual no formato "dd/mm/aaaa"
     * @example 
     * var data = util.getDataSimples();
     * @author Cássio
    */
    getDataSimples: function () {
        var today = new Date();
        var data = today.getDate().toString().padStart(2, '0')
            + '/' + (today.getMonth() + 1).toString().padStart(2, '0')
            + '/' + today.getFullYear();
        return data;
    },

    /**
     * @function getDataSimplesSomaDias
     * @category Utils
     * @class
     * @description - Retorna a data atual no formato "dd/mm/aaaa" somando o número de dias informado por parâmetro
     * @param {number} dias - Número de dias que devem ser acrescidos na data.
     * @example 
     * var dataMais30Dias = util.getDataSimplesSomaDias(30);
     * @author Cássio
    */
    getDataSimplesSomaDias: function (dias) {
        var data = new Date();
        data.setDate(data.getDate() + dias)
        var dataPronta = data.getDate().toString().padStart(2, '0')
            + '/' + (data.getMonth() + 1).toString().padStart(2, '0')
            + '/' + data.getFullYear();
        return dataPronta;
    },

    /**
     * @function getDataSimplesSomaMeses
     * @category Utils
     * @class
     * @description - Retorna a data atual no formato "dd/mm/aaaa" somando o número de meses informado por parâmetro
     * @param {number} meses - Número de meses que devem ser acrescidos na data.
     * @example 
     * var dataMais6Meses = util.getDataSimplesSomaMeses(6);
     * @author Cássio
    */
    getDataSimplesSomaMeses: function (meses) {
        var data = new Date();
        data.setMonth(data.getMonth() + meses)
        var dataPronta = data.getDate().toString().padStart(2, '0')
            + '/' + (data.getMonth() + 1).toString().padStart(2, '0')
            + '/' + data.getFullYear();
        return dataPronta;
    },

    /**
     * @function _gera_random
     * @category Utils
     * @class
     * @private
     * @description - Função privada que gera número randômico. Utilizada pelas funções geraCpf e geraCnpj
     * @param {number} n - Número limite do random
     * @author Cássio
    */
    _gera_random: function (n) {
        var ranNum = Math.round(Math.random() * n);
        return ranNum;
    },

    /**
     * @function _mod
     * @category Utils
     * @class
     * @private
     * @description - Função privada que gera os 2 dígitos verificadores para criar CPF ou CNPJ válidos
     * @param {number} dividendo - Dividendo da conta
     * @param {number} divisor - Divisor da conta
     * @author Cássio
    */
    _mod: function (dividendo, divisor) {
        return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
    },

    /**
     * @function _isXpath
     * @category Utils
     * @class
     * @private
     * @description - Função privada que verifica se o localizador passado por parâmetro é um Xpath. Retornando true ou false.
     * Essa função é utilizada pelo core na verificação dos localizadores passados por parâmetro em todas as funções.
     * Dessa forma é possível utilizar a maioria das funções do core, sem se preocupar em utilizar os comandos "useXpath ou useCss".
     * @param {string} localizador - Localizador **Css** ou **Xpath**
     * @author Cássio
    */
    _isXpath: function (localizador) {
        if (localizador.startsWith("//")) {
            return true;
        } else {
            return false;
        }
    },
}
