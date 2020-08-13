// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function salvaCadastro
     * @category Core commands
     * @module
     * @description - Salva a janela de cadastro aberta e aguarda o toast indicando que o registro foi salvo.
     * Caso o sistema possua a funcionalidade padrão de abrir novamente uma janela de cadastro após salvar, ela será fechada automaticamente.
     * @param {string} nomeDaJanela - Nome do título da janela de cadastro que será salva.
     * @example 
     * browser.salvaCadastro("Plano de ação")
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
            .useXpath()
            .element("xpath", "//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']", function (visible) {
                if (visible.status != -1)
                    this.waitForElementPresent("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']" + "/ancestor::div " + loc.geral.btnCancelarX)
                        .click("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']" + "/ancestor::div " + loc.geral.btnCancelarX);
            })
            .assert.not.elementPresent("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']")
            .useCss();

        return this;
    },
};