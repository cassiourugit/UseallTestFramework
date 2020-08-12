// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function salvaProcesso
     * @category Core commands
     * @module
     * @description - Salva a janela do processo aberta e aguarda o toast indicando que o registro foi salvo.
     * @param {string} nomeDaJanela - Nome do título da janela de cadastro que será salva.
     * @example 
     * browser.salvaProcesso("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDaJanela) {
        if (!nomeDaJanela) {
            this.assert.fail("O parâmetro 'nomeDaJanela' não foi informado")
            return this;
        }

        this.useXpath()
            .waitForElementPresent("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']")
            .click("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']" + "/ancestor::div " + loc.geral.btnSalvarX)
            .aguardaToast()
            .useCss();

        return this;
    },
};