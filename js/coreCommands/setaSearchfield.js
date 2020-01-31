// @ts-nocheck
const util = require("../utils/util");
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function setaSearchfield
     * @category Core Commands
     * @module
     * @description - Busca e seta o valor informado por parâmetro no searchfield
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo searchfield
     * @param {string} texto - Texto a ser buscado
     * @example 
     * browser.setaSearchfield("input[data-test-id='Searchfield']", "Texto")
     * @author Cássio
    */
    command: function (campo, texto) {
        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementVisible(campo)
                .sendKeys(campo, texto)
                .useCss()
                .aguardaListagem()
                .expect.elements(loc.geral.listaSearchfield).count.to.equal(1);

            this.assert.attributeContains(loc.geral.listaSearchfield, "textContent", texto)
                .click(loc.geral.listaSearchfield)
                .useXpath()
                .assert.attributeContains(campo, "value", texto)
                .useCss();
        } else {
            this.waitForElementVisible(campo)
                .sendKeys(campo, texto)
                .aguardaListagem()
                .expect.elements(loc.geral.listaSearchfield).count.to.equal(1);

            this.assert.attributeContains(loc.geral.listaSearchfield, "textContent", texto)
                .click(loc.geral.listaSearchfield)
                .assert.attributeContains(campo, "value", texto)
        }

        this.removeListaSearchfield();

        return this;
    },
};