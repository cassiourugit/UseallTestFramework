// @ts-nocheck
module.exports = {
    /**
     * @function fecharAba
     * @category Core Commands
     * @module
     * @description - Procura a aba contendo o nome indicado pelo parâmetro e clica no X para fechar
     * @param {String} nomeDaAba - Nome da aba que será fechada
     * @example browser.fechaAba("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDaAba) {
        this.useXpath()
            .waitForElementPresent("//span[text()= '" + nomeDaAba + "']/following::span[text()= ' Fechar']")
            .click("//span[text()= '" + nomeDaAba + "']/following::span[text()= ' Fechar']")
            .waitForElementNotPresent("//span[text()= '" + nomeDaAba + "']/following::span[text()= ' Fechar']")
            .useCss();

        return this;
    },
};