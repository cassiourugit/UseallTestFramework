// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function setaGridField
     * @category Core commands
     * @module
     * @description - Digita o valor passapor parâmetro no campo de texto
     * @param {string} colGrid - Localizador **Css** ou **Xpath** da coluna da grid que tem o campo
     * @param {string} campoGrid - Localizador **Css** ou **Xpath** do campo dentro da coluna da grid
     * @param {number} valor - **Inteiro** com o valor a ser setado no campo
     * @example 
     * browser.setaGridField(".x-grid-item:nth-child(1) .x-grid-cell:nth-child(6)", "input[id^='campo']", "5")
     * @author Cássio
    */
    command: function (colGrid, campoGrid, valor) {
        if (colGrid == "" || colGrid == null || colGrid == undefined) {
            this.assert.fail("O parâmetro 'colGrid' não foi informado")
            return this;
        }

        if (campoGrid == "" || campoGrid == null || campoGrid == undefined) {
            this.assert.fail("O parâmetro 'campoGrid' não foi informado")
            return this;
        }

        if (valor == "" || valor == null || valor == undefined) {
            this.assert.fail("O parâmetro 'valor' não foi informado")
            return this;
        }

        if (util._isXpath(colGrid)) {
            this.useXpath()
                .waitForElementPresent(colGrid)
                .click(colGrid)
                .useCss()
        } else {
            this.waitForElementPresent(colGrid)
                .click(colGrid)
        }

        if (util._isXpath(campoGrid)) {
            this.useXpath()
                .waitForElementPresent(campoGrid)
                .setValue(campoGrid, valor)
                .useCss()
        } else {
            this.waitForElementPresent(campoGrid)
                .setValue(campoGrid, valor)
        }

        browser.keys(browser.Keys.TAB)

        return this;
    },
};