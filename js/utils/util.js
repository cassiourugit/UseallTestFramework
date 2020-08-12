// @ts-nocheck
const fs = require("fs");
const path = require('path');

module.exports = {

    /**
     * @function aplicaRegexString
     * @category Utils
     * @module
     * @description - Aplica regex em uma string
     * @param {String} string - String
     * @param {Regex} expressao - Expressão regex
     * @example browser.aplicaRegexString("Frase de exemplo", Expressão Regex)
     * @author Cássio
    */
    aplicaRegexString: function (string, expressao) {
        let stringFinal;
        let m;

        while ((m = expressao.exec(string)) !== null) {
            if (m.index === expressao.lastIndex) {
                expressao.lastIndex++;
            }

            m.forEach((match) => {
                stringFinal = `${match}`
            });
        }

        return stringFinal;
    },

    /**
        * @function geraCnpj
        * @category Utils
        * @module
        * @description - Gera um CNPJ válido
        * @param {boolean} [comMascara = false] - **Opcional** Se o parâmetro for "true" o CNPJ será gerado com máscara. Caso não seja informado, o padrão é gerar CNPJ sem máscara.
        * @example 
        * var cnpj = util.geraCnpj();
        * @author Cássio
       */
    geraCnpj: function (comMascara) {
        let n = 9;
        let n1 = this._gera_random(n);
        let n2 = this._gera_random(n);
        let n3 = this._gera_random(n);
        let n4 = this._gera_random(n);
        let n5 = this._gera_random(n);
        let n6 = this._gera_random(n);
        let n7 = this._gera_random(n);
        let n8 = this._gera_random(n);
        let n9 = 0;//_gera_random(n);
        let n10 = 0;//_gera_random(n);
        let n11 = 0;//_gera_random(n);	
        let n12 = 1;//_gera_random(n);		
        let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
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
     * @function geraCpf
     * @category Utils
     * @module
     * @description - Gera um CPF válido
     * @param {boolean} [comMascara = false] - **Opcional** Se o parâmetro for "true" o CPF será gerado com máscara. Caso não seja informado, o padrão é gerar CPF sem máscara.
     * @example
     * var cpf = util.geraCpf();
     * @author Cássio
    */
    geraCpf: function (comMascara = false) {
        let n = 9;
        let n1 = this._gera_random(n);
        let n2 = this._gera_random(n);
        let n3 = this._gera_random(n);
        let n4 = this._gera_random(n);
        let n5 = this._gera_random(n);
        let n6 = this._gera_random(n);
        let n7 = this._gera_random(n);
        let n8 = this._gera_random(n);
        let n9 = this._gera_random(n);
        let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
        d1 = 11 - (this._mod(d1, 11));
        if (d1 >= 10) d1 = 0;
        let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
        d2 = 11 - (this._mod(d2, 11));
        if (d2 >= 10) d2 = 0;

        if (comMascara)
            return '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
        else
            return '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
    },

    /**
         * @function getData
         * @category Utils
         * @module
         * @description - Retorna uma string da data atual no formato "dd/mm/aaaa"
         * @example 
         * var data = util.getData();
         * @author Cássio
        */
    getData: function () {
        let today = new Date();
        let data = today.getDate().toString().padStart(2, '0')
            + '/' + (today.getMonth() + 1).toString().padStart(2, '0')
            + '/' + today.getFullYear();
        return data;
    },

    /**
    * @function getDataHora
    * @category Utils
    * @module
    * @description - Retorna uma string da data atual no formato "dd/mm/aaaa-HH:mm:ss:mls"
    * @example 
    * var data = util.getDataHora();
    * @author Cássio
   */
    getDataHora: function () {
        let today = new Date();
        let data = today.getDate().toString().padStart(2, '0')
            + '/' + (today.getMonth() + 1).toString().padStart(2, '0')
            + '/' + today.getFullYear()
            + '-' + today.getHours()
            + ':' + today.getMinutes()
            + ':' + today.getSeconds()
            + ':' + today.getMilliseconds();

        return data;
    },

    /**
     * @function geraString
     * @category Utils
     * @module
     * @description - Gera uma string com o tamanho informado
     * @param {number} tamanho - Tamanho que a string gerada deve ter
     * @param {Boolean} [numberField = false] - **Opcional** Se setado como "true" a string será gerada usando apenas números.
     * @example 
     * var stringDe100Caracteres = util.geraString(100);
     * @author Cássio
    */
    geraString: function (tamanho, numberField = false) {
        let texto = "";
        let caracteres = null;

        if (numberField) {
            caracteres = "123456789";
        } else {
            caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        }

        for (let i = 0; i < tamanho; i++)
            texto += caracteres.charAt(Math.floor(Math.random() * caracteres.length));

        return texto;
    },

    /**
         * @function limpaDiretorio
         * @category Utils
         * @module
         * @description - Remove todos os arquivos dentro do diretório recebido por parâmetro
         * @param {String} diretorio - Caminho até o diretório que deve ser limpo
         * @example 
         * util.limpaDiretorio(c:/temp);
         * @author Cássio
        */
    limpaDiretorio: function (diretorio) {
        return new Promise(function (resolve, reject) {
            fs.readdir(diretorio, (err, files) => {
                resolve();
                if (err) reject(err);

                for (const file of files) {
                    fs.unlink(path.join(diretorio, file), err => {
                        console.log("Arquivos removidos com sucesso.")
                        resolve();
                        if (err) reject(err);
                    });
                }
            });
        });
    },

    /**
     * @function somaDias
     * @category Utils
     * @module
     * @description - Retorna a data acrescida com o número de dias informado por parâmetro
     * @param {date} data - Data que deve ter os dias acrescidos
     * @param {number} dias - Número de dias que devem ser acrescidos na data
     * @param {boolean} [retornaString = true] - **Opcional** Retorna uma String da data no formato "dd/mm/aaaa"
     * @example 
     * var dataMais30Dias = util.somaDias(data, 30);
     * @author Cássio
    */
    somaDias: function (data, dias, retornaString = true) {
        let dataPronta = data.setDate(data.getDate() + dias);
        if (retornaString) {
            dataPronta = data.getDate().toString().padStart(2, '0')
                + '/' + (data.getMonth() + 1).toString().padStart(2, '0')
                + '/' + data.getFullYear();
        }

        return dataPronta;
    },

    /**
     * @function somaMeses
     * @category Utils
     * @module
     * @description - Retorna a data acrescida com o número de meses informado por parâmetro
     * @param {date} data - Data que deve ter os meses acrescidos
     * @param {number} meses - Número de meses que devem ser acrescidos na data
     * @param {boolean} [retornaString = true] - **Opcional** Retorna uma String da data no formato "dd/mm/aaaa"
     * @example 
     * var dataMais6Meses = util.somaMeses(data, 6);
     * @author Cássio
    */
    somaMeses: function (data, meses, retornaString = true) {
        let dataPronta = data.setMonth(data.getMonth() + meses);
        if (retornaString) {
            dataPronta = data.getDate().toString().padStart(2, '0')
                + '/' + (data.getMonth() + 1).toString().padStart(2, '0')
                + '/' + data.getFullYear();
        }

        return dataPronta;
    },

    /**
     * @function somaAnos
     * @category Utils
     * @module
     * @description - Retorna a data acrescida com o número de anos informado por parâmetro
     * @param {date} data - Data que deve ter os anos acrescidos
     * @param {number} anos - Número de anos que devem ser acrescidos na data
     * @param {boolean} [retornaString = true] - **Opcional** Retorna uma String da data no formato "dd/mm/aaaa"
     * @example 
     * var dataMais5Anos = util.somaAnos(data, 5);
     * @author Cássio
    */
    somaAnos: function (data, anos, retornaString = true) {
        let dataPronta = data.setFullYear(data.getFullYear() + anos);
        if (retornaString) {
            dataPronta = data.getDate().toString().padStart(2, '0')
                + '/' + (data.getMonth() + 1).toString().padStart(2, '0')
                + '/' + data.getFullYear();
        }

        return dataPronta;
    },

    /**
     * @function limpaString
     * @category Utils
     * @module
     * @description - Retorna uma string sem caracteres especiais e espaços
     * @param {string} string - String
     * @example 
     * var stringLimpa = util.limpaString("Espelho de ação corretiva");
     * @author Cássio
    */
    limpaString: function (string) {
        let stringFinal = null;

        stringFinal = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');;
        stringFinal = stringFinal.replace(/\s+/g, '');

        return stringFinal;
    },

    /**
     * @function _gera_random
     * @category Utils
     * @module
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
     * @module
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
     * @module
     * @private
     * @description - Função privada que verifica se o localizador passado por parâmetro é um Xpath. Retornando true ou false.
     * Essa função é utilizada pelo core na verificação dos localizadores passados por parâmetro em todas as funções.
     * Dessa forma é possível utilizar a maioria das funções do core, sem se preocupar em utilizar os comandos "useXpath ou useCss".
     * @param {string} localizador - Localizador **Css** ou **Xpath**
     * @author Cássio
    */
    _isXpath: function (localizador) {
        if (localizador.startsWith("/")) {
            return true;
        } else {
            return false;
        }
    },
}
