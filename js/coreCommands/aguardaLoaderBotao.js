// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function aguardaLoaderBotao
     * @category Core commands
     * @module
     * @description - Aguarda até que o Loader do botão desapareça antes de prosseguir o teste
     * @param {string} loader - Localizador **Css** ou **Xpath** do loader do botão
     * @example browser.aguardaLoaderBotao("span[class*='icone-loader-buttons-16x16']")
     * @author Cássio
    */
    command: function (loader) {
        if (loader == "" || loader == null || loader == undefined) {
            this.assert.fail("O parâmetro 'loader' não foi informado")
            return this;
        }

        this
            .waitForElementPresent(loader, 5, "Loader do botão não apareceu após 5 segundos")
            .waitForElementNotPresent(loader, "Loader do botão não desapareceu após o timeout máximo definido por padrão")

        return this;
    },
};