// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function editaRegistro
     * @category Commands
     * @class
     * @description - Clica no lápis para edição de um registro na grid e aguarda até que o campo indicado por parâmetro receba o foco após a abertura da janela
     * @param {String} lapisLinhaRegistro - Localizador **Css** ou **Xpath** com o ícone do lápis da linha a ser editada
     * @param {String} campoComFoco - Localizador **Css** ou **Xpath** correspondente ao primeiro campo a receber foco após a abertura da janela
     * @example browser.editaRegistro(".x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)", "input[data-test-id='Descricao']")
     * @author Cássio
    */
    command: function (lapisLinhaRegistro, campoComFoco) {
        if (util._isXpath(lapisLinhaRegistro)) {
            this.useXpath()
                .waitForElementPresent(lapisLinhaRegistro)
                .click(lapisLinhaRegistro)
                .useCss();
        } else {
            this.waitForElementPresent(lapisLinhaRegistro)
                .click(lapisLinhaRegistro)
        }

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