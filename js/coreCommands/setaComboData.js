// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function setaComboData
     * @category Core commands
     * @module
     * @description - Busca e seta o valor informado por parâmetro dentro da combo de data
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo combobox que será setado
     * @param {string} opcao - Nome da opção a ser setada no campo
     * @example 
     * browser.setaComboData("input[data-test-id='ComboDdata']", "Todos")
     * @author Cássio
    */
    command: function (campo, opcao) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (opcao == "" || opcao == null || opcao == undefined) {
            this.assert.fail("O parâmetro 'opcao' não foi informado")
            return this;
        }

        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementVisible(campo)
                .getAttribute('xpath', campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                    let picker = "//div[@id='" + str + "-dateRangeCombo-trigger-picker']"
                    let lista = "//ul[@id='" + str + "-dateRangeCombo-picker-listEl']";

                    this.click('xpath', picker)
                        .waitForElementVisible('xpath', lista + "//li[contains(text(),'" + opcao + "')] | " + lista + "//li/div[contains(text(),'" + opcao + "')]")
                        .click('xpath', lista + "//li[contains(text(),'" + opcao + "')] | " + lista + "//li/div[contains(text(),'" + opcao + "')]")
                        .element("xpath", campo, function (result) {
                            this.elementIdAttribute(result.value.ELEMENT, "aria-expanded", function (attribute) {
                                if (attribute.value == "true") {
                                    this.click(campo)
                                }
                            });
                        })
                        .useCss();
                });
        } else {
            this.waitForElementVisible(campo)
                .getAttribute(campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                    let picker = "//div[@id='" + str + "-dateRangeCombo-trigger-picker']"
                    let lista = "//ul[@id='" + str + "-dateRangeCombo-picker-listEl']";

                    this.click('xpath', picker)
                        .useXpath()
                        .waitForElementVisible('xpath', lista + "//li[contains(text(),'" + opcao + "')] | " + lista + "//li/div[contains(text(),'" + opcao + "')]")
                        .click('xpath', lista + "//li[contains(text(),'" + opcao + "')] | " + lista + "//li/div[contains(text(),'" + opcao + "')]")
                        .useCss()
                        .element("css selector", campo, function (result) {
                            this.elementIdAttribute(result.value.ELEMENT, "aria-expanded", function (attribute) {
                                if (attribute.value == "true") {
                                    this.click(campo)
                                }
                            });
                        });
                });
        }

        return this;
    },
};