// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function aguardaFoco
     * @category Core commands
     * @module
     * @description - Aguarda até que o campo indicado por parâmetro receba o foco
     * @param {String} campoComFoco - Localizador **Css** ou **Xpath** correspondente ao primeiro campo que receberá o foco
     * @example browser.aguardaFoco("input[data-test-id='Descricao']")
     * @author Cássio
    */
    command: function (campo) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        let xpathId; // String xpath que será montada com base no id dinamico extraído do elemento campo

        //Conjunto if-else que identificam o tipo de localizador do elemento "campo" e extraem o id dinamico.
        if (util._isXpath(campo)) {
            this.useXpath()
                .getAttribute('xpath', campo, 'id', function (result) {
                    xpathId = "//input[@id='" + result.value + "']";

                    //Valida se o campo do localizador xpathId é um checkbox ou um campo normal, e verifica se o mesmo tem foco.
                    this.getAttribute('xpath', xpathId, "type", function (result) {
                        if (result.value == "checkbox") {
                            this.waitForElementPresent('xpath', xpathId + "/parent::span[contains(@class, 'x-field-default-form-checkbox-focus')]")
                            return this;
                        } else {
                            this.waitForElementPresent('xpath', xpathId + "[contains(@class, 'x-field-default-form-focus')]")
                            return this;
                        }
                    })
                })
                .useCss();
        } else {
            this.useCss()
                .getAttribute(campo, 'id', function (result) {
                    xpathId = "//input[@id='" + result.value + "']";

                    //Valida se o campo do localizador xpathId é um checkbox ou um campo normal, e verifica se o mesmo tem foco.
                    this.getAttribute('xpath', xpathId, "type", function (result) {
                        if (result.value == "checkbox") {
                            this.waitForElementPresent('xpath', xpathId + "/parent::span[contains(@class, 'x-field-default-form-checkbox-focus')]")
                            return this;
                        } else {
                            this.waitForElementPresent('xpath', xpathId + "[contains(@class, 'x-field-default-form-focus')]")
                            return this;
                        }
                    })
                })
        }
    },
};