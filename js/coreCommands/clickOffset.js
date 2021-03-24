// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function clickOffset
     * @category Core commands
     * @module
     * @description - Clica exatamente na posição específica de um elemento.
     * @param {string} elemento - Localizador **Css** ou **Xpath** do elemento que você deseja clicar
     * @param {number} xoffset - Offset da posição X (Horizontal)
     * @param {number} yoffset - Offset da posição Y (Vertical)
     * @example 
     * browser.clickOffset("input[data-test-id='btn_novo']", 10, 10)
     * @author Cássio
    */
    command: function (elemento, xoffset, yoffset) {
        if (elemento == "" || elemento == null || elemento == undefined) {
            this.assert.fail("O parâmetro 'elemento' não foi informado")
            return this;
        }

        if (xoffset == "" || xoffset == null || xoffset == undefined) {
            this.assert.fail("O parâmetro 'xoffset' não foi informado")
            return this;
        }

        if (yoffset == "" || yoffset == null || yoffset == undefined) {
            this.assert.fail("O parâmetro 'yoffset' não foi informado")
            return this;
        }

        if (util._isXpath(elemento)) {
            this.useXpath()
                .waitForElementPresent('xpath', elemento, "O botão não está presente após o tempo máximo previsto")
                .moveToElement(elemento, xoffset, yoffset)
                .mouseButtonClick(0)
                .useCss();
        } else {
            this.waitForElementPresent('css selector', elemento, "O botão não está presente após o tempo máximo previsto")
                .moveToElement(elemento, xoffset, yoffset)
                .mouseButtonClick(0)
        }

        return this;
    },
};