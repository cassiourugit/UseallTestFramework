// @ts-nocheck
const util = require("usealltestframework/js/utils/util");

module.exports = {
    /**
     * @function setaNumberField
     * @category Core commands
     * @module
     * @description - Digita o valor passado por parâmetro no campo numérico
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo numérico
     * @param {string} numero - Número a ser digitado no campo
     * @example 
     * browser.setaNumberField("input[data-test-id='Searchfield']", "3,00")
     * Obs: Números decimais devem ter o separador na forma de vírgula.
     * @author Cássio
    */
    command: function (campo, numero) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (numero == "" || numero == null || numero == undefined) {
            this.assert.fail("O parâmetro 'numero' não foi informado")
            return this;
        }

        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementPresent('xpath', campo)
                .click('xpath', campo)
                .limpaCampo(campo)
                .setValue(campo, numero)
                .clickOffset(campo, -1, -1)
                .useCss();
        } else {
            this.waitForElementPresent(campo)
                .click(campo)
                .limpaCampo(campo)
                .setValue(campo, numero)
                .clickOffset(campo, -1, -1)
        }

        return this;
    },
};