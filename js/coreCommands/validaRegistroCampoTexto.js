// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function validaRegistroCampoTexto
     * @category Core Commands
     * @module
     * @description - Verifica se o campo possui o texto informado
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo
     * @param {string} texto - Texto que deve estar sendo exibido no campo
     * @example 
     * browser.validaRegistroCampoTexto("input[data-test-id='campo']", "texto")
     * @author Cássio
    */
    command: function (campo, texto) {
        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementPresent(campo)
                .assert.attributeEquals(campo, "value", texto)
                .useCss();
        } else {
            this.waitForElementPresent(campo)
                .assert.attributeEquals(campo, "value", texto);
        }

        return this;
    },
};