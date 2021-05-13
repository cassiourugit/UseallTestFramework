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

        if (util._isXpath(localizador)) {
            if (check) {
                this.useXpath()
                    .waitForElementPresent('xpath', localizador, "A checkbox não foi encontrada no tempo máximo previsto")
                    .getElementProperty('xpath', localizador, "checked", function (result) {
                        if (result.value == false) {
                            this.click('xpath', localizador);
                        }
                    })
                    .useCss();
            } else {
                this.useXpath()
                    .waitForElementPresent('xpath', localizador, "A checkbox não foi encontrada no tempo máximo previsto")
                    .getElementProperty('xpath', localizador, "checked", function (result) {
                        if (result.value == true) {
                            this.click('xpath', localizador);
                        }
                    })
                    .useCss();
            }

        } else {
            if (check) {
                this.useCss()
                    .waitForElementPresent('css selector', localizador, "A checkbox não foi encontrada no tempo máximo previsto")
                    .getElementProperty('css selector', localizador, "checked", function (result) {
                        console.log("A propriedade estava assim:" + result.value)
                        if (result.value == false) {
                            this.click('css selector', localizador);
                        }
                    })
            } else {
                this.useCss()
                    .waitForElementPresent('css selector', localizador, "A checkbox não foi encontrada no tempo máximo previsto")
                    .getElementProperty('css selector', localizador, "checked", function (result) {
                        console.log("A propriedade estava assim:" + result.value)
                        if (result.value == true) {
                            this.click('css selector', localizador);
                        }
                    })
            }
        }

        return this;
    },
};