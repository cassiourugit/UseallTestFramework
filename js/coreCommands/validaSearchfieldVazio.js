// @ts-nocheck
const util = require("../utils/util");
const loc = require("../commumLocators");
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
                .clearValue(campo)
                .sendKeys(campo, texto)
                .useCss()
                .aguardaListagem()
                .expect.elements(loc.geral.listaSearchfieldVazia).count.to.equal(1);

            this.getAttribute(loc.geral.listaSearchfieldVazia, 'textContent', function (result) {
                if (result.value.includes("Nenhum registro encontrado") == false) {
                    if (config.deveDestacarElemento) {
                        this.destacaElemento(loc.geral.listaSearchfieldVazia)
                        this.assert.attributeContains(loc.geral.listaSearchfieldVazia, "textContent", "Nenhum registro encontrado", "A listagem deveria mostrar (Nenhum registro encontrado), porém mostrou (" + result.value + ")")

                        return this;
                    }
                    this.assert.attributeContains(loc.geral.listaSearchfieldVazia, 'textContent', "Nenhum registro encontrado", "A listagem deveria mostrar (Nenhum registro encontrado), porém mostrou (" + result.value + ")")

                    return this;
                }
            })
        } else {
            this.useCss()
                .waitForElementVisible(campo)
                .clearValue(campo)
                .sendKeys(campo, texto)
                .aguardaListagem()
                .expect.elements(loc.geral.listaSearchfieldVazia).count.to.equal(1);

            this.getAttribute(loc.geral.listaSearchfieldVazia, 'textContent', function (result) {
                if (result.value.includes("Nenhum registro encontrado") == false) {
                    if (config.deveDestacarElemento) {
                        this.destacaElemento(loc.geral.listaSearchfieldVazia)
                        this.assert.attributeContains(loc.geral.listaSearchfieldVazia, "textContent", "Nenhum registro encontrado", "A listagem deveria mostrar (Nenhum registro encontrado), porém mostrou (" + result.value + ")")

                        return this;
                    }
                    this.assert.attributeContains(loc.geral.listaSearchfieldVazia, 'textContent', "Nenhum registro encontrado", "A listagem deveria mostrar (Nenhum registro encontrado), porém mostrou (" + result.value + ")")

                    return this;
                }
            })
        }

        this.removeListaSearchfield();

        return this;
    },
};