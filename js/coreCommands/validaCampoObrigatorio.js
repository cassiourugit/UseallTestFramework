// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function validaCampoObrigatorio
     * @category Core commands
     * @module
     * @description - Verifica se o campo informado é obrigatório
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo
     * @example 
     * browser.validaCampoObrigatorio("input[data-test-id='campo']")
     * @author Cássio
    */
    command: function (campo) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (util._isXpath(campo)) {
            this.useXpath()
                .click(campo);
            this.keys(this.Keys.TAB);
            this.assert.attributeEquals(campo, "aria-invalid", "true", "O campo " + campo + " não está marcado como obrigatório.")
                .assert.attributeEquals(campo, "aria-required", "true", "O campo " + campo + " não está marcado como obrigatório.")
                .assert.attributeContains(campo, "data-errorqtip", "Este campo é obrigatório.", "O campo " + campo + " não está marcado como obrigatório.")
                .useCss();
        } else {
            this.click(campo);
            this.keys(this.Keys.TAB);
            this.assert.attributeEquals(campo, "aria-invalid", "true", "O campo " + campo + " não está marcado como obrigatório.")
                .assert.attributeEquals(campo, "aria-required", "true", "O campo " + campo + " não está marcado como obrigatório.")
                .assert.attributeContains(campo, "data-errorqtip", "Este campo é obrigatório.", "O campo " + campo + " não está marcado como obrigatório.")
        }

        return this;
    },
};