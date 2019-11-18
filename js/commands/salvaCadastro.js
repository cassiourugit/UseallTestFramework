// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function salvaCadastro
     * @category Commands
     * @module
     * @description - Salva a janela de cadastro aberta e aguarda o toast indicando que o registro foi salvo.
     * Caso o sistema possua a funcionalidade padrão de abrir novamente uma janela de cadastro após salvar, ela será fechada automaticamente.
     * @param {string} nomeDaJanela - Nome do título da janela de cadastro que será salva.
     * @example 
     * browser.salvaCadastro("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDaJanela) {
        this.useXpath()
            .waitForElementPresent("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']")
            .useCss()
            .click(loc.geral.btnSalvar)
            .aguardaToast()
            .element("xpath", "//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']", function (visible) {
                if (visible.status != -1)
                    this.useCss()
                        .waitForElementPresent(loc.geral.btnCancelar)
                        .click(loc.geral.btnCancelar);
            })
            .useXpath()
            .assert.elementNotPresent("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']")
            .useCss();

        return this;
    },
};