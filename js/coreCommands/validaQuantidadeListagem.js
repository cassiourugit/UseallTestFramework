// @ts-nocheck
const util = require("usealltestframework/js/utils/util");

module.exports = {
    /**
     * @function validaQuantidadeListagem
     * @category Core commands
     * @module
     * @description - Verifica se a listagem está vazia, caso esteja, um erro será disparado.np
     * @param {string} listagem - Localizador **Css** ou **Xpath** da listagem
     * @param {number} quantidade - Número de registros que a listagem deve apresentar
     * @example 
     * browser.validaQuantidadeListagem()
     * @author Cássio
    */
    command: function (listagem, quantidade) {
        if (listagem == "" || listagem == null || listagem == undefined) {
            this.assert.fail("O parâmetro 'listagem' não foi informado")
            return this;
        }

        if (util._isXpath(listagem)) {
            this.useXpath();
            this.expect.elements(listagem + "//tr").count.to.equal(quantidade);
            this.useCss();
        } else {
            this.useCss();
            this.expect.elements(listagem + " tr").count.to.equal(quantidade);
        }
    },
};