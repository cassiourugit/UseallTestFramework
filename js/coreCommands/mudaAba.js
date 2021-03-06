// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function mudaAba
     * @category Core commands
     * @module
     * @description - Abre a aba desejada
     * @param {string} aba - Localizador **Css** ou **Xpath** da aba que deve ser aberta
     * @example 
     * browser.mudaAba("//span[text()= 'Endereços']")
     * @author Cássio
    */
    command: function (aba) {
        if (!aba) {
            this.assert.fail("O parâmetro 'aba' não foi informado")
            return this;
        }

        if (util._isXpath(aba)) {
            this.useXpath()
                .waitForElementVisible('xpath', aba, "A aba não foi encontrada no tempo máximo previsto")
                .click(aba)
                .useCss();
        } else {
            this.waitForElementVisible('css selector', aba, "A aba não foi encontrada no tempo máximo previsto")
                .click(aba)
        }

        return this;
    },
};