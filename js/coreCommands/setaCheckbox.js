// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function setaCheckbox
     * @category Core commands
     * @module
     * @description - Marca ou desmarca uma checkbox
     * @param {string} localizador - Localizador **Css** ou **Xpath** da checkbox
     * @param {Boolean} check - Se "true" marca a checkbox, se "false" desmarca a checkbox
     * @example 
     * browser.setaCheckbox("input[data-test-id='check']", true)
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
            if (check) {
                this.useXpath()
                    .waitForElementPresent('xpath', localizador)
                    .getAttribute(localizador, "checked", function (result) {
                        if (result.value == false) {
                            this.click(localizador);
                        }
                    })
                    .useCss();
            } else {
                this.useXpath()
                    .waitForElementPresent(localizador)
                    .getAttribute(localizador, "checked", function (result) {
                        if (result.value == true) {
                            this.click(localizador);
                        }
                    })
                    .useCss();
            }

        } else {
            if (check) {
                this.useCss()
                    .waitForElementPresent(localizador)
                    .getAttribute(localizador, "checked", function (result) {
                        if (result.value == false) {
                            this.click(localizador);
                        }
                    })
            } else {
                this.useCss()
                    .waitForElementPresent(localizador)
                    .getAttribute(localizador, "checked", function (result) {
                        if (result.value == true) {
                            this.click(localizador);
                        }
                    })
            }
        }

        return this;
    },
};