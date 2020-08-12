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
     * @param {String} [btnNovo = false] **Opcional** - Localizador **Css** ou **XPath** correspondente ao botão para abrir o cadastro
     * Caso não seja informado, o botão clicado será o padrão para abrir novos registros.
     * @example 
     * browser.abreCadastro("input[data-test-id='Descricao']")
     * @author Cássio
    */
    command: function (campoComFoco, btnNovo = false) {
        if (!campoComFoco) {
            this.assert.fail("O parâmetro 'campoComFoco' não foi informado")
            return this;
        }

        if (btnNovo) {
            if (util._isXpath(btnNovo)) {
                this.useXpath()
                    .waitForElementPresent(btnNovo)
                    .click(btnNovo);
            }
        } else {
            this.useCss()
                .waitForElementPresent(loc.geral.btnNovo)
                .click(loc.geral.btnNovo);
        }

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