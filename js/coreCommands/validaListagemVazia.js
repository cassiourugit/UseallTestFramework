// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function validaListagemVazia
     * @category Core commands
     * @module
     * @description - Verifica se a listagem está vazia, caso esteja, um erro será disparado.np
     * @param {string} listagem - Localizador **Css** ou **Xpath** da listagem
     * @example 
     * browser.validaListagemVazia()
     * @author Cássio
    */
    command: function (listagem) {
        if (listagem == "" || listagem == null || listagem == undefined) {
            this.assert.fail("O parâmetro 'listagem' não foi informado")
            return this;
        }

        if (util._isXpath(listagem)) {
            this.useXpath();
            this.expect.elements(listagem + "//tr").count.to.equal(0);
            this.useCss();
        } else {
            this.useCss();
            this.expect.elements(listagem + " tr").count.to.equal(0);
        }
    },
};