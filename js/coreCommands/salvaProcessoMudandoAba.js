// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function salvaProcessoMudandoAba
     * @category Core commands
     * @module
     * @description - Salva a janela do processo aberta através da mudança de aba e aguarda o toast indicando que o registro foi salvo.
     * @param {string} btnAba - Localizador **Css** ou **Xpath** da aba
     * @example 
     * browser.salvaProcessoMudandoAba("//div[@role='tablist'] //span[text()= 'Ações']")
     * @author Cássio
    */
    command: function (btnAba) {
        if (!btnAba) {
            this.assert.fail("O parâmetro 'btnAba' não foi informado")
            return this;
        }

        if (util._isXpath(btnAba)) {
            this.useXpath()
                .waitForElementPresent(btnAba)
                .click(btnAba)
                .aguardaToast()
                .useCss();
        } else {
            this.useCss()
                .waitForElementPresent(btnAba)
                .click(btnAba)
                .aguardaToast()
        }

        return this;
    },
};