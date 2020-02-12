// @ts-nocheck
const util = require("../utils/util");
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function abreCadastro
     * @category Core commands
     * @module
     * @description - Abre uma nova janela de cadastro e aguarda ela estar pronta para interação.
     * @param {String} campoComFoco - Localizador **Css** ou **XPath** correspondente ao primeiro campo a receber foco após a abertura da janela.
     * @example 
     * browser.abreCadastro("input[data-test-id='Descricao']")
     * @author Cássio
    */
    command: function (campoComFoco) {
        if (campoComFoco == "" || campoComFoco == null || campoComFoco == undefined) {
            this.assert.fail("O parâmetro 'campoComFoco' não foi informado")
            return this;
        }

        this.useCss()
            .waitForElementPresent(loc.geral.btnNovo)
            .click(loc.geral.btnNovo);

        if (util._isXpath(campoComFoco)) {
            this.useXpath()
                .aguardaFoco(campoComFoco)
                .useCss();
        } else {
            this.useCss()
                .aguardaFoco(campoComFoco);
        }

        return this;
    },
};