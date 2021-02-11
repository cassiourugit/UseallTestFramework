// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function validaSearchfieldVazio
     * @category Core commands
     * @module
     * @description - Faz uma busca no searchfild e passa o teste apenas se o searchfield não retornar nenhum resultado
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo searchfield
     * @param {string} texto - Texto a ser buscado
     * @example 
     * browser.validaSearchfieldVazio("input[data-test-id='Searchfield']", "Texto")
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
                .waitForElementVisible('xpath', campo)
                .getAttribute('xpath', campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                    let lista = "ul[id='" + str + "-picker-listEl']";

                    this.clearValue(campo)
                        .setValue(campo, texto)
                        .useCss()
                        .aguardaListagem()
                        .expect.elements(lista + " li", "css selector").count.to.equal(0);

                    this.getAttribute(lista, 'textContent', function (result) {
                        if (result.value.includes("Nenhum registro encontrado") == false) {
                            if (config.deveDestacarElemento) {
                                this.destacaElemento(lista)
                                this.assert.attributeContains(lista, "textContent", "Nenhum registro encontrado", "A listagem deveria mostrar (Nenhum registro encontrado), porém mostrou (" + result.value + ")")

                                return this;
                            }
                            this.assert.attributeContains(lista, 'textContent', "Nenhum registro encontrado", "A listagem deveria mostrar (Nenhum registro encontrado), porém mostrou (" + result.value + ")")

                            return this;
                        }
                    })
                });
        } else {
            this.useCss()
                .waitForElementVisible(campo)
                .getAttribute(campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                    let lista = "ul[id='" + str + "-picker-listEl']";

                    this.clearValue(campo)
                        .setValue(campo, texto)
                        .aguardaListagem()
                        .expect.elements(lista + " li", "css selector").count.to.equal(0);

                    this.getAttribute(lista, 'textContent', function (result) {
                        if (result.value.includes("Nenhum registro encontrado") == false) {
                            if (config.deveDestacarElemento) {
                                this.destacaElemento(lista)
                                this.assert.attributeContains(lista, "textContent", "Nenhum registro encontrado", "A listagem deveria mostrar (Nenhum registro encontrado), porém mostrou (" + result.value + ")")

                                return this;
                            }
                            this.assert.attributeContains(lista, 'textContent', "Nenhum registro encontrado", "A listagem deveria mostrar (Nenhum registro encontrado), porém mostrou (" + result.value + ")")

                            return this;
                        }
                    })
                });
        }
        return this;
    },
};