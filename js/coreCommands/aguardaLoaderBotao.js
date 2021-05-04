// @ts-nocheck
const util = require("usealltestframework/js/utils/util");
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function aguardaLoaderBotao
     * @category Core commands
     * @module
     * @description - Aguarda até que o Loader do botão fique invisível antes de prosseguir o teste
     * @param {string} botao - Localizador **Css** ou **Xpath** do botão que apresenta o loader
     * @example browser.aguardaLoaderBotao("//span[text()='Salvar")
     * @author Cássio
    */
    command: function (botao) {
        if (botao == "" || botao == null || botao == undefined) {
            this.assert.fail("O parâmetro 'botao' não foi informado")
            return this;
        }

        let str;
        let botaoId;

        if (util._isXpath(botao)) {
            this.waitForElementVisible('xpath', botao, "O botão informado não está visível na tela")
                .getAttribute('xpath', botao, 'id', function (result) {
                    str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    botaoId = "//a[@id='" + str + "']/descendant::span[@data-ref='btnIconEl'][contains(@class, 'icone-loader-button')]";

                    this.waitForElementVisible('xpath', botaoId, 5000, "Loader do botão não apareceu após 5 segundos")
                        .waitForElementNotVisible('xpath', botaoId, 30000, "Loader do botão não desapareceu após o timeout máximo definido por padrão")
                        .useCss();

                    return this;
                });
        } else {
            this.waitForElementVisible('css selector', botao, "O botão informado não está visível na tela")
                .getAttribute('css selector', botao, 'id', function (result) {
                    str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    botaoId = "//a[@id='" + str + "']/descendant::span[@data-ref='btnIconEl'][contains(@class, 'icone-loader-button')]";

                    this.waitForElementVisible('xpath', botaoId, 5000, "Loader do botão não apareceu após 5 segundos")
                        .waitForElementNotVisible('xpath', botaoId, 30000, "Loader do botão não desapareceu após o timeout máximo definido por padrão")
                        .useCss();

                    return this;
                });
        }
    }
}