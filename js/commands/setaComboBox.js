// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function setaComboBox
     * @category Commands
     * @module
     * @description - Busca e seta o valor informado por parâmetro dentro da combobox
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo combobox que será setado
     * @param {string} opcao - Nome da opção a ser setada no campo
     * @example 
     * browser.setaComboBox("input[data-test-id='Combo']", "Opção")
     * @author Cássio
    */
    command: function (campo, opcao) {
        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementVisible(campo)
                .click(campo)
                .waitForElementVisible("//li[contains(text(),'" + opcao + "')] | //li/div[contains(text(), '" + opcao + "')]")
                .click("//li[contains(text(),'" + opcao + "')] | //li/div[contains(text(), '" + opcao + "')]")
                .element("xpath", campo, function (result) {
                    this.elementIdAttribute(result.value.ELEMENT, "aria-expanded", function (attribute) {
                        if (attribute.value == "true") {
                            this.click(campo)
                        }
                    });
                })
                .useCss();
        } else {
            this.waitForElementVisible(campo)
                .click(campo)
                .useXpath()
                .waitForElementVisible("//li[contains(text(),'" + opcao + "')] | //li/div[contains(text(), '" + opcao + "')]")
                .click("//li[contains(text(),'" + opcao + "')] | //li/div[contains(text(), '" + opcao + "')]")
                .useCss()
                .element("css selector", campo, function (result) {
                    this.elementIdAttribute(result.value.ELEMENT, "aria-expanded", function (attribute) {
                        if (attribute.value == "true") {
                            this.click(campo)
                        }
                    });
                });
        }

        this.removeListaSearchfield();

        return this;
    },
};