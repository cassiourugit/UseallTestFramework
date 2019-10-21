// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function desordenarListagem
     * @category Commands
     * @class
     * @description - Clica no cabeçalho da coluna código de uma listagem para desordenar a lista
     * @example browser.aguardaRemissaoRelatorio()
     * @author Cássio
    */
    command: function () {
        this.useXpath()
            .waitForElementPresent(util.geral.cabecalhoColunaCodigoX)
            .click(util.geral.cabecalhoColunaCodigoX)
            .useCss()
            .aguardaListagem();

        return this;
    },
};