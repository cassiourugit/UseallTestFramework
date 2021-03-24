// @ts-nocheck
const util = require("../utils/util");
module.exports = {
    /**
     * @function limpaCampo
     * @category Core commands
     * @module
     * @description - Limpa um campo de texto
     * @param {String} campo - Localizador **Css** ou **Xpath** do campo combobox que deve ser limpo
     * @example browser.limpaCampo("input[data-test-id='campo']")
     * @author Cássio
    */
    command: function (campo) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }


        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementVisible('xpath', campo, "O campo para ser limpo não foi encontrado no tempo máximo previsto")
                .click('xpath', campo)
                .keys([this.Keys.CONTROL, "a"])
                .keys(this.Keys.NULL)
                .keys(this.Keys.BACK_SPACE)
                .useCss();

            return this;
        }

        this.waitForElementVisible('css selector', campo, "O campo para ser limpo não foi encontrado no tempo máximo previsto")
            .click('css selector', campo)
            .keys([this.Keys.CONTROL, "a"])
            .keys(this.Keys.NULL)
            .keys(this.Keys.BACK_SPACE)
            .useCss();

        return this;
    },
};