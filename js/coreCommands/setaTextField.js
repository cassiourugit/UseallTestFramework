// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function setaTextField
     * @category Core commands
     * @module
     * @description - Digita o valor passapor parâmetro no campo de texto
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo de texto
     * @param {string} texto - Texto a ser digitado no campo
     * @example 
     * browser.setaTextField("input[data-test-id='Searchfield']", "Texto")
     * @author Cássio
    */
    command: function (campo, texto) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (texto == "" || texto == null || texto == undefined) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }

        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementPresent('xpath', campo)
                .clearValue(campo)
                .sendKeys(campo, texto)
                .useCss();
        } else {
            this.waitForElementPresent(campo)
                .clearValue(campo)
                .sendKeys(campo, texto)
        }

        return this;
    },
};