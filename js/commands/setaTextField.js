// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function setaTextField
     * @category Commands
     * @class
     * @description - Digita o valor passapor parâmetro no campo de texto
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo de texto
     * @param {string} texto - Texto a ser digitado no campo
     * @example 
     * browser.setaTextField("input[data-test-id='Searchfield']", "Texto")
     * @author Cássio
    */
    command: function (campo, texto) {
        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementPresent(campo)
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