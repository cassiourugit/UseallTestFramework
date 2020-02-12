// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function desordenarListagem
     * @category Core commands
     * @module
     * @description - Clica no cabeçalho da coluna código de uma listagem para desordenar a lista
     * @param {string} labelColuna - Localizador **Css** ou **Xpath** correspondente a coluna que o sistema irá desordenar
     * @example browser.desordenarListagem("Código")
     * @author Cássio
    */
    command: function (labelColuna) {
        if (labelColuna == "" || labelColuna == null || labelColuna == undefined) {
            this.assert.fail("O parâmetro 'labelColuna' não foi informado")
            return this;
        }

        if (util._isXpath(labelColuna)) {
            this.useXpath()
                .waitForElementPresent(labelColuna)
                .click(labelColuna)
                .useCss()
        } else {
            this.waitForElementPresent(labelColuna)
                .click(labelColuna)
        }

        this.aguardaListagem();

        return this;
    },
};