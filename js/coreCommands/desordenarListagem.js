// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function desordenarListagem
     * @category Core Commands
     * @module
     * @description - Clica no cabeçalho da coluna código de uma listagem para desordenar a lista
     * @example browser.aguardaRemissaoRelatorio()
     * @author Cássio
    */
    command: function () {
        this.useXpath()
            .waitForElementPresent(loc.geral.cabecalhoColunaCodigoX)
            .click(loc.geral.cabecalhoColunaCodigoX)
            .useCss()
            .aguardaListagem();

        return this;
    },
};