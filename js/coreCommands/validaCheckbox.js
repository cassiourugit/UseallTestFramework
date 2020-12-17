// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function validaCheckbox
     * @category Core commands
     * @module
     * @description - Valida se a checkbox está marcada ou desmarcada
     * @param {string} localizador - Localizador **Css** ou **Xpath** da checkbox
     * @param {Boolean} check - Valor que a checkbox deveria ter
     * @example 
     * browser.validaCheckbox("input[data-test-id='check']", true)
     * @author Cássio
    */
    command: function (localizador, check) {
        if (localizador == "" || localizador == null || localizador == undefined) {
            this.assert.fail("O parâmetro 'localizador' não foi informado")
            return this;
        }

        if (check == "" || check == null || check == undefined) {
            this.assert.fail("O parâmetro 'check' não foi informado")
            return this;
        }

        if (util._isXpath(localizador)) {
            this.useXpath()
                .waitForElementPresent('xpath', localizador)
                .assert.attributeEquals(localizador, "checked", check, "A checkbox deveria estar (" + check + "), porém está (" + !check + ")")
                .useCss();
        } else {
            this.useCss()
                .waitForElementPresent(localizador)
                .assert.attributeEquals(localizador, "checked", check, "A checkbox deveria estar (" + check + "), porém está (" + !check + ")");
        }

        return this;
    },
};