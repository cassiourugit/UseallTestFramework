// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function validaAtributoContem
     * @category Core commands
     * @module
     * @description - Verifica se o atributo do elemento contém o texto informado
     * @param {string} elemento - Localizador **Css** ou **Xpath** do elemento
     * @param {string} atributo - Atributo que deve ser verificado no elemento 
     * @param {string} texto - Texto que deve estar sendo exibido no elemento
     * @example 
     * browser.validaAtributoContem(".x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)", "textContent", "Texto")
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
                    if (!result.value.includes(texto)) {
                        if (config.deveDestacarElemento) {
                            this.destacaElemento(elemento)
                            this.assert.attributeContains(elemento, atributo, texto, "O atributo: " + atributo + " do elemento em destaque deveria conter (" + texto + "), porém contém (" + result.value + ")")
                                .useCss();

                            return this;
                        }
                        this.assert.attributeContains(elemento, atributo, texto, "O atributo: " + atributo + " do elemento em destaque deveria conter (" + texto + "), porém contém (" + result.value + ")")
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
                if (!result.value.includes(texto)) {
                    if (!config.deveDestacarElemento) {
                        this.assert.attributeContains(elemento, atributo, texto, "O atributo: " + atributo + " do elemento em destaque deveria conter (" + texto + "), porém contém (" + result.value + ")");

                        return this;
                    }
                    this.destacaElemento(elemento)
                    this.assert.attributeContains(elemento, atributo, texto, "O atributo: " + atributo + " do elemento em destaque deveria conter (" + texto + "), porém contém (" + result.value + ")")
                        .useCss();

                    return this;
                }
            })

        return this;
    },
};