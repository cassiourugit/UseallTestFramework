// @ts-nocheck
const util = require("usealltestframework/js/utils/util");
const config = require("usealltestframework/js/utils/configDefinitions");

module.exports = {
    /**
     * @function validaAtributoIgual
     * @category Core commands
     * @module
     * @description - Verifica se o conteúdo do atributo do elemento é igual ao texto informado
     * @param {string} elemento - Localizador **Css** ou **Xpath** do elemento
     * @param {string} atributo - Atributo que deve ser verificado no elemento 
     * @param {string} texto - Texto que deve estar sendo exibido no elemento
     * @example 
     * browser.validaAtributoIgual(".x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)", "textContent", "Texto")
     * @author Cássio
    */
    command: function (elemento, atributo, texto) {
        if (elemento == "" || elemento == null || elemento == undefined) {
            this.assert.fail("O parâmetro 'elemento' não foi informado")
            return this;
        }

        if (atributo == "" || atributo == null || atributo == undefined) {
            this.assert.fail("O parâmetro 'atributo' não foi informado")
            return this;
        }

        if (texto == "" || texto == null || texto == undefined) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }

        if (util._isXpath(elemento)) {
            this.useXpath()
                .waitForElementVisible('xpath', elemento, "O elemento: " + elemento + " não foi encontrado no tempo máximo previsto")
                .getAttribute(elemento, atributo, function (result) {
                    if (result.value != texto) {
                        if (config.deveDestacarElemento) {
                            this.destacaElemento(elemento)
                            this.assert.attributeEquals(elemento, atributo, texto, "O atributo: " + atributo + " do elemento em destaque deveria ser igual a (" + texto + "), porém é (" + result.value + ")")
                                .useCss();

                            return this;
                        }
                        this.assert.attributeEquals(elemento, atributo, texto, "O atributo: " + atributo + " do elemento em destaque deveria ser igual a (" + texto + "), porém é (" + result.value + ")")
                            .useCss();

                        return this;
                    }
                })
                .useCss();

            return this;
        }

        this.useCss()
            .waitForElementVisible('css selector', elemento, "O elemento: " + elemento + " não foi encontrado no tempo máximo previsto")
            .getAttribute(elemento, atributo, function (result) {
                if (result.value != texto) {
                    if (!config.deveDestacarElemento) {
                        this.assert.attributeEquals(elemento, atributo, texto, "O atributo: " + atributo + " do elemento em destaque deveria ser igual a (" + texto + "), porém é (" + result.value + ")");

                        return this;
                    }
                    this.destacaElemento(elemento)
                    this.assert.attributeEquals(elemento, atributo, texto, "O atributo: " + atributo + " do elemento em destaque deveria ser igual a (" + texto + "), porém é (" + result.value + ")")
                        .useCss();

                    return this;
                }
            })

        return this;
    },
};