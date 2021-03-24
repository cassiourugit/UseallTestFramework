// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function validaRegistroCelulaGrid
     * @category Core commands
     * @module
     * @description - Verifica se a célula da grid possui o texto informado
     * @param {string} celula - Localizador **Css** ou **Xpath** da célula
     * @param {string} texto - Texto que deve estar sendo exibido na célula
     * @example 
     * browser.validaRegistroCelulaGrid(".x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)", "texto")
     * @author Cássio
    */
    command: function (celula, texto) {
        if (celula == "" || celula == null || celula == undefined) {
            this.assert.fail("O parâmetro 'celula' não foi informado")
            return this;
        }

        if (texto == "" || texto == null || texto == undefined) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }

        if (util._isXpath(celula)) {
            this.useXpath()
                .waitForElementVisible('xpath', celula, "A célula da grid não foi encontrada no tempo máximo previsto")
                .getAttribute(celula, 'textContent', function (result) {
                    if (result.value != texto) {
                        if (config.deveDestacarElemento) {
                            this.destacaElemento(celula)
                            this.assert.attributeEquals(celula, "textContent", texto, "A célula da grid deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")
                                .useCss();

                            return this;
                        }
                        this.assert.attributeEquals(celula, 'textContent', texto, "A célula da grid deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")
                            .useCss();

                        return this;
                    }
                })
                .useCss();

            return this;
        }

        this.useCss()
            .waitForElementVisible('css selector', celula, "A célula da grid não foi encontrada no tempo máximo previsto")
            .getAttribute(celula, 'textContent', function (result) {
                if (result.value != texto) {
                    if (!config.deveDestacarElemento) {
                        this.assert.attributeEquals(celula, 'textContent', texto, "A célula da grid deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")");

                        return this;
                    }
                    this.destacaElemento(celula)
                    this.assert.attributeEquals(celula, "textContent", texto, "A célula da grid deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")
                        .useCss();

                    return this;
                }
            })

        return this;
    },
};