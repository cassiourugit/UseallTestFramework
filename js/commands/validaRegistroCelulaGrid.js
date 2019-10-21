// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function validaRegistroCelulaGrid
     * @category Commands
     * @class
     * @description - Verifica se a célula da grid possui o texto informado
     * @param {string} celula - Localizador **Css** ou **Xpath** da célula
     * @param {string} texto - Texto que deve estar sendo exibido na célula
     * @example 
     * browser.validaRegistroCelulaGrid(".x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)", "texto")
     * @author Cássio
    */
    command: function (celula, texto) {
        if (util._isXpath(celula)) {
            this.useXpath()
                .waitForElementVisible(celula)
                .assert.attributeEquals(celula, 'textContent', texto)
                .useCss();
        } else {
            this.waitForElementVisible(celula)
                .assert.attributeEquals(celula, 'textContent', texto);
        }

        return this;
    },
};