// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function salvaCadastro
     * @category Commands
     * @class
     * @description - Salva a janela de cadastro aberta e aguarda o toast indicando que o registro foi salvo.
     * Caso o sistema possua a funcionalidade padrão de abrir novamente uma janela de cadastro após salvar, ela será fechada automaticamente.
     * @param {string} nomeDaJanela - Nome do título da janela de cadastro que será salva.
     * @example 
     * browser.salvaCadastro("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDaJanela) {
        this.useXpath()
            .waitForElementPresent("//div[text()= '" + nomeDaJanela + "']")
            .useCss()
            .click(util.geral.btnSalvar)
            .esperaToastRegistroSalvo()
            .element("xpath", "//div[text()= '" + nomeDaJanela + "']", function (visible) {
                if (visible.status != -1)
                    this.useCss()
                        .waitForElementPresent(util.geral.btnCancelar)
                        .click(util.geral.btnCancelar);
            })
            .useXpath()
            .assert.elementNotPresent("//div[text()= '" + nomeDaJanela + "']")
            .useCss();

        return this;
    },
};