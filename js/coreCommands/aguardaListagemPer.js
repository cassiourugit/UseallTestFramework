// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function aguardaListagemPer
     * @category Core commands
     * @module
     * @description - Aguarda o elemento que indica o carregamento de algum processo aparecer e sumir antes de prosseguir com o teste
     * @param {string} elemento - Localizador **Css** ou **Xpath** do elemento que indica o carregamento
     * @param {number} [timeout = false] - **Opcional** Tempo máximo em milissegundos que o teste irá esperar pela listagem carregar
     * @example browser.aguardaListagemPer("//div[text()= 'Carregando...']", "5000")
     * @author Cássio
    */
    command: function (elemento, timeout = false) {
        if (!timeout) {
            timeout = 10000;
        }

        this.pause(500);

        if (util._isXpath(elemento)) {
            this.useXpath()
                .waitForElementNotPresent('xpath', elemento, timeout, "O loader da listagem não desapareceu após o tempo máximo de " + timeout + " milisegundos")
                .useCss();
        } else {
            this.useCss()
                .waitForElementNotPresent('css selector', elemento, timeout, "O loader da listagem não desapareceu após o tempo máximo de " + timeout + " milisegundos");
        }

        return this;
    },
};