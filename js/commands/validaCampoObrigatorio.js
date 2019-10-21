// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function validaCampoObrigatorio
     * @category Commands
     * @class
     * @description - Verifica se o campo informado é obrigatório
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo
     * @example 
     * browser.validaCampoObrigatorio("input[data-test-id='campo']")
     * @author Cássio
    */
    command: function (campo) {
        if (util._isXpath(campo)) {
            this.useXpath()
                .click(campo);
            this.keys(this.Keys.TAB);
            this.assert.attributeEquals(campo, "aria-invalid", "true")
                .assert.attributeEquals(campo, "aria-required", "true")
                .assert.attributeContains(campo, "data-errorqtip", "Este campo é obrigatório.")
                .useCss();
        } else {
            this.click(campo);
            this.keys(this.Keys.TAB);
            this.assert.attributeEquals(campo, "aria-invalid", "true")
                .assert.attributeEquals(campo, "aria-required", "true")
                .assert.attributeContains(campo, "data-errorqtip", "Este campo é obrigatório.")
        }

        return this;
    },
};