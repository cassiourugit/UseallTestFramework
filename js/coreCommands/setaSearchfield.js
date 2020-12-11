// @ts-nocheck
const util = require("../utils/util");
const loc = require("../commumLocators");
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function setaSearchfield
     * @category Core commands
     * @module
     * @description - Busca e seta o valor informado por parâmetro no searchfield
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo searchfield
     * @param {string} texto - Texto a ser buscado
     * @param {boolean} [remove = true] - **Opcional** Default true, remove a listagem carregada pelo campo de busca, para não intertefir nos testes
     * @example 
     * browser.setaSearchfield("input[data-test-id='Searchfield']", "Texto")
     * @author Cássio
    */
    command: function (campo, texto, remove = true) {
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
                .waitForElementVisible(campo)
                .clearValue(campo)
                .sendKeys(campo, texto)
                .useCss()
                .aguardaListagem()
                .expect.elements(loc.geral.listaSearchfield).count.to.equal(1);

            this.getAttribute(loc.geral.listaSearchfield, 'textContent', function (result) {
                if (result.value.includes(texto) == false) {
                    if (config.deveDestacarElemento) {
                        this.destacaElemento(loc.geral.listaSearchfield)
                        this.assert.attributeContains(loc.geral.listaSearchfield, "textContent", texto, "A listagem deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                        return this;
                    }
                    this.assert.attributeContains(loc.geral.listaSearchfield, 'textContent', texto, "A listagem deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                    return this;
                }
                this.click(loc.geral.listaSearchfield)
                    .useXpath()
                    .assert.attributeContains(campo, "value", texto)
                    .useCss();
            })
        } else {
            this.useCss()
                .waitForElementVisible(campo)
                .clearValue(campo)
                .sendKeys(campo, texto)
                .aguardaListagem()
                .expect.elements(loc.geral.listaSearchfield).count.to.equal(1);

            this.getAttribute(loc.geral.listaSearchfield, 'textContent', function (result) {
                if (result.value.includes(texto) == false) {
                    if (config.deveDestacarElemento) {
                        this.destacaElemento(loc.geral.listaSearchfield)
                        this.assert.attributeContains(loc.geral.listaSearchfield, "textContent", texto, "A listagem deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                        return this;
                    }
                    this.assert.attributeContains(loc.geral.listaSearchfield, 'textContent', texto, "A listagem deveria mostrar (" + texto + "), porém mostrou (" + result.value + ")")

                    return this;
                }
                this.click(loc.geral.listaSearchfield)
                    .assert.attributeContains(campo, "value", texto)
            })
        }

        if(remove){
            this.removeListaSearchfield();
        }

        return this;
    },
};