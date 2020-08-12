// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function aguardaListagemPer
     * @category Core commands
     * @module
     * @description - Aguarda o elemento que indica o carregamento de algum processo aparecer e sumir antes de prosseguir com o teste
     * @param {string} elemento - Localizador **Css** ou **Xpath** do elemento que indica o carregamento
     * @param {number} timeout - Tempo máximo em milissegundos que o teste irá esperar pela listagem carregar
     * @example browser.aguardaListagemPer("//div[text()= 'Carregando...']", "5000")
     * @author Cássio
    */
    command: function (elemento, timeout) {
        this.pause(200);
        if (util._isXpath(elemento)) {
            this.useXpath()
                .waitForElementNotPresent(elemento, timeout)
                .useCss();
        } else {
            this.useCss()
                .waitForElementNotPresent(elemento, timeout);
        }

        return this;
    },
};