// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");

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

        if (util._isXpath(localizador)) {
            this.useXpath()
                .waitForElementPresent('xpath', localizador, "A checkbox não foi encontrada no tempo máximo previsto")
                .getAttribute(localizador, "id", function (id) {
                    let str = util.aplicaRegexString(id.value, /.*\d+(?=\-)?/g);
                    let checkField = "div[id='" + str + "-innerWrapEl']";

                    this.getElementProperty('xpath', localizador, "checked", function (result) {
                        resultadoCheck = Boolean(result.value)
                        if (resultadoCheck != check) {
                            if (config.deveDestacarElemento) {
                                this.destacaElemento(checkField)
                                this.assert.attributeEquals(localizador, "checked", check, "A checkbox deveria estar (" + check + "), porém está (" + !check + ")")
                                    .useCss();

                                return this;
                            }
                            this.assert.attributeEquals(localizador, "checked", check, "A checkbox deveria estar(" + check + "), porém está(" + !check + ")")
                                .useCss();

                            return this;
                        }
                    })
                        .useCss();
                })

        } else {
            this.useCss()
                .waitForElementPresent('css selector', localizador, "A checkbox não foi encontrada no tempo máximo previsto")
                .getAttribute(localizador, "id", function (id) {
                    let str = util.aplicaRegexString(id.value, /.*\d+(?=\-)?/g);
                    let checkField = "div[id='" + str + "-innerWrapEl']";

                    this.getElementProperty(localizador, "checked", function (result) {
                        resultadoCheck = Boolean(result.value)
                        if (resultadoCheck != check) {
                            if (config.deveDestacarElemento) {
                                this.destacaElemento(checkField)
                                this.assert.attributeEquals(localizador, "checked", check, "A checkbox deveria estar (" + check + "), porém está (" + !check + ")")
                                    .useCss();

                                return this;
                            }
                            this.assert.attributeEquals(localizador, "checked", check, "A checkbox deveria estar(" + check + "), porém está(" + !check + ")")
                                .useCss();

                            return this;
                        }
                    })
                })
        }

        return this;
    },
};