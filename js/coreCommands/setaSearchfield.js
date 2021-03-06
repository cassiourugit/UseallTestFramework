// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function setaSearchfield
     * @category Core commands
     * @module
     * @description - Busca e seta o valor informado por parâmetro no searchfield
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo searchfield
     * @param {string} texto - Texto a ser buscado
     * @example 
     * browser.setaSearchfield("input[data-test-id='Searchfield']", "Texto")
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
                .waitForElementVisible('xpath', campo, "Campo de busca não foi encontrado no tempo máximo previsto")
                .getAttribute('xpath', campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    let lista = "ul[id='" + str + "-picker-listEl'] li";

                    this.clearValue(campo)
                        .setValue(campo, texto)
                        .useCss()
                        .aguardaListagem();
                    this.expect.elements(lista, 'css selector').count.to.equal(1);

                    this.getAttribute(lista, 'textContent', function (result) {
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
                            .useXpath()
                            .expect.element(campo, 'xpath').to.have.attribute("value").which.contains(texto).before(5000)
                        this
                            .assert.attributeContains(campo, "value", texto, "A opção selecionada não foi setada no campo")
                            .useCss();
                    })
                });
            return this;
        } else {
            this.useCss()
                .waitForElementVisible('css selector', campo, "Campo de busca não foi encontrado no tempo máximo previsto")
                .getAttribute(campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    let lista = "ul[id='" + str + "-picker-listEl'] li";

                    this.clearValue(campo)
                        .setValue(campo, texto)
                        .aguardaListagem()
                        .expect.elements(lista, 'css selector').count.to.equal(1);

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
                            .expect.element(campo, 'css selector').to.have.attribute("value").which.contains(texto).before(5000)
                        this
                            .assert.attributeContains(campo, "value", texto, "A opção selecionada não foi setada no campo")
                    })
                })
            return this;
        }
    },
};