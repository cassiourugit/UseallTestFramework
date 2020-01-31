// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function aguardaFoco
     * @category Core Commands
     * @module
     * @description - Aguarda até que o campo indicado por parâmetro receba o foco
     * @param {String} campoComFoco - Localizador **Css** ou **Xpath** correspondente ao primeiro campo que receberá o foco
     * @example browser.aguardaFoco("input[data-test-id='Descricao']")
     * @author Cássio
    */
    command: function (campo) {
        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementPresent(campo + "[contains(@module, 'x-field-default-form-focus')]")
                .useCss();
        } else {
            this.waitForElementPresent(campo + ".x-field-default-form-focus");
        }

        return this;
    },
};