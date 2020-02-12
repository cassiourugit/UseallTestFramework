// @ts-nocheck
module.exports = {
    /**
     * @function fecharAba
     * @category Core commands
     * @module
     * @description - Procura a aba contendo o nome indicado pelo parâmetro e clica no X para fechar
     * @param {String} nomeDaAba - Nome da aba que será fechada
     * @example browser.fechaAba("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDaAba) {
        if (nomeDaAba == "" || nomeDaAba == null || nomeDaAba == undefined) {
            this.assert.fail("O parâmetro 'nomeDaAba' não foi informado")
            return this;
        }

        this.useXpath()
            .waitForElementPresent("//span[text()= '" + nomeDaAba + "']/following::span[text()= ' Fechar']")
            .click("//span[text()= '" + nomeDaAba + "']/following::span[text()= ' Fechar']")
            .waitForElementNotPresent("//span[text()= '" + nomeDaAba + "']/following::span[text()= ' Fechar']", "A aba não foi fechada.")
            .useCss();

        return this;
    },
};