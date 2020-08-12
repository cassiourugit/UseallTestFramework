// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function validaBuscaRetornouUmRegistro
     * @category Core commands
     * @module
     * @description - Verifica se a busca listou apenas um registro na grid
     * @param {string} listagem - Localizador **Css** ou **Xpath** da listagem
     * @example 
     * browser.validaBuscaRetornouUmRegistro("div[id^='lista-atendimentocliente-despesa']")
     * @author Cássio
    */
    command: function (celula) {
        if (!celula) {
            this.assert.fail("O parâmetro 'celula' não foi informado")
            return this;
        }

        if (util._isXpath(celula)) {
            this.useXpath()
                .waitForElementVisible(celula)
                .expect.elements(celula + "//tr").count.to.equal(1)
                .useCss();
        }

        this.useCss()
            .waitForElementVisible(celula)
            .expect.elements(celula + " tr").count.to.equal(1)
    },
};