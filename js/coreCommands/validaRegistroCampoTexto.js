// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function validaRegistroCampoTexto
     * @category Core commands
     * @module
     * @description - Verifica se o campo possui o texto informado
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo
     * @param {string} texto - Texto que deve estar sendo exibido no campo
     * @example 
     * browser.validaRegistroCampoTexto("input[data-test-id='campo']", "texto")
     * @author Cássio
    */
    command: function (campo, texto) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (texto == "" || texto == null || texto == undefined) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }

        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementPresent('xpath', campo, "O campo não foi encontrado no tempo máximo previsto")
            this.getAttribute(campo, 'value', function (result) {
                if (result.value != texto) {
                    if (config.deveDestacarElemento) {
                        this.destacaElemento(campo)
                        this.assert.attributeEquals(campo, "value", texto, "O campo deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                        return this;
                    }
                    this.assert.attributeEquals(campo, 'value', texto, "O campo deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                    return this;
                }
            })
                .useCss();
        } else {
            this.waitForElementPresent('css selector', campo, "O campo não foi encontrado no tempo máximo previsto")
                .getAttribute(campo, 'value', function (result) {
                    if (result.value != texto) {
                        if (config.deveDestacarElemento) {
                            this.destacaElemento(campo)
                            this.assert.attributeEquals(campo, "value", texto, "O campo deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                            return this;
                        }
                        this.assert.attributeEquals(campo, 'value', texto, "O campo deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                        return this;
                    }
                })
        }

        return this;
    },
};