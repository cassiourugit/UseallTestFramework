// @ts-nocheck
const util = require("usealltestframework/js/utils/util");
const loc = require("usealltestframework/js/commumLocators");

module.exports = {
    /**
     * @function aguardaLoaderBotaoNotPresent
     * @category Core commands
     * @module
     * @description - Aguarda até que o Loader do botão desapareça antes de prosseguir o teste
     * @param {string} botao - Localizador **Css** ou **Xpath** do botão que apresenta o loader
     * @param {number} [timeout = 10000]  - **Opcional** Timeout em milisegundos para aguardar o loader do botão desaparecer (Por padrão são 10 segundos)
     * @example browser.aguardaLoaderBotaoNotPresent("//span[text()='Salvar")
     * @author Cássio
    */
    command: function (botao, timeout = 10000) {
        if (botao == "" || botao == null || botao == undefined) {
            this.assert.fail("O parâmetro 'botao' não foi informado")
            return this;
        }

        let str;
        let botaoId;

        if (util._isXpath(botao)) {
            this.waitForElementPresent('xpath', botao, "O botão informado não está visível na tela")
                .getAttribute('xpath', botao, 'id', function (result) {
                    str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    botaoId = "//a[@id='" + str + "']/descendant::span[@data-ref='btnIconEl'][contains(@class, 'icone-loader-button')]";

                    this.pause(200)
                        .element('xpath', botaoId, function (result) {
                            if (result.status > -1) {
                                this.waitForElementNotPresent('xpath', botaoId, timeout, "Loader do botão não desapareceu após o timeout máximo definido por padrão")
                            }
                        })
                        .useCss()

                    return this;
                });
        } else {
            this.waitForElementPresent('css selector', botao, "O botão informado não está visível na tela")
                .getAttribute('css selector', botao, 'id', function (result) {
                    str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    botaoId = "//a[@id='" + str + "']/descendant::span[@data-ref='btnIconEl'][contains(@class, 'icone-loader-button')]";

                    this.pause(200)
                        .element('xpath', botaoId, function (result) {
                            if (result.status > -1) {
                                this.waitForElementNotPresent('xpath', botaoId, timeout, "Loader do botão não desapareceu após o timeout máximo definido por padrão")
                            }
                        })
                        .useCss()

                    return this;
                });
        }
    }
}