// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function setaSearchFieldMulti
     * @category Core commands
     * @module
     * @description - Busca e seta o valor informado por parâmetro no searchfield multi-seleção
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo searchfield
     * @param {string} texto - Texto a ser buscado
     * @example 
     * browser.setaSearchFieldMulti("input[data-test-id='Searchfield']", "Texto")
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
                .waitForElementPresent('xpath', campo)
                .getAttribute('xpath', campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    let lista = "ul[id='" + str + "-picker-listEl'] li";
                    let grid = "//input[starts-with(@id, '" + str + "')]/ancestor::div[starts-with(@id, 'container-searchfield-multiselect')]/descendant::div[@class='x-grid-item-container']"

                    this.clearValue('xpath', campo)
                        .setValue('xpath', campo, texto)
                        .aguardaListagem()

                    this.getAttribute('css selector', lista, 'textContent', function (result) {
                        if (result.value.includes(texto) == false) {
                            if (config.deveDestacarElemento) {
                                this.destacaElemento(lista)
                                this.assert.attributeContains(lista, "textContent", texto, "A listagem deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                                return this;
                            }
                            this.assert.attributeContains(lista, 'textContent', texto, "A listagem deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                            return this;
                        }
                        this.click(lista)
                            .waitForElementPresent('xpath', grid)
                            .useXpath()
                            .assert.attributeContains(grid, "textContent", texto, "A opção selecionada não foi encontrada na listagem do campo")
                            .useCss()
                    })
                })
            return this;
        } else {
            this.useCss()
                .waitForElementPresent('css selector', campo)
                .getAttribute('css selector', campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    let lista = "ul[id='" + str + "-picker-listEl'] li";
                    let grid = "//input[starts-with(@id, '" + str + "')]/ancestor::div[starts-with(@id, 'container-searchfield-multiselect')]/descendant::div[@class='x-grid-item-container']"

                    this.clearValue('css selector', campo)
                        .setValue('css selector', campo, texto)
                        .aguardaListagem()

                    this.getAttribute('css selector', lista, 'textContent', function (result) {
                        if (result.value.includes(texto) == false) {
                            if (config.deveDestacarElemento) {
                                this.destacaElemento(lista)
                                this.assert.attributeContains(lista, "textContent", texto, "A listagem deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                                return this;
                            }
                            this.assert.attributeContains(lista, 'textContent', texto, "A listagem deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                            return this;
                        }
                        this.click(lista)
                            .waitForElementPresent('xpath', grid)
                            .useXpath()
                            .assert.attributeContains(grid, "textContent", texto, "A opção selecionada não foi encontrada na listagem do campo")
                            .useCss()
                    })
                })
            return this;
        }
    },
};