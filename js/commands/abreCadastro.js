// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function abreCadastro
     * @category Commands
     * @class
     * @description - Abre uma nova janela de cadastro e aguarda ela estar pronta para interação.
     * @param {String} campoComFoco - Localizador **Css** ou **XPath** correspondente ao primeiro campo a receber foco após a abertura da janela.
     * @example 
     * browser.abreCadastro("input[data-test-id='Descricao']")
     * @author Cássio
    */
    command: function (campoComFoco) {
        this.waitForElementPresent(util.geral.btnNovo)
            .click(util.geral.btnNovo);

        if (util._isXpath(campoComFoco)) {
            this.useXpath()
                .esperaFoco(campoComFoco)
                .useCss();
        } else {
            this.esperaFoco(campoComFoco);
        }

        return this;
    },
};