// @ts-nocheck
const util = require("../utils/util");
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function abreCadastro
     * @category Commands
     * @module
     * @description - Abre uma nova janela de cadastro e aguarda ela estar pronta para interação.
     * @param {String} campoComFoco - Localizador **Css** ou **XPath** correspondente ao primeiro campo a receber foco após a abertura da janela.
     * @example 
     * browser.abreCadastro("input[data-test-id='Descricao']")
     * @author Cássio
    */
    command: function (campoComFoco) {
        this.waitForElementPresent(loc.geral.btnNovo)
            .click(loc.geral.btnNovo);

        if (util._isXpath(campoComFoco)) {
            this.useXpath()
                .aguardaFoco(campoComFoco)
                .useCss();
        } else {
            this.aguardaFoco(campoComFoco);
        }

        return this;
    },
};