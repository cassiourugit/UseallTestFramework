// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function fechaJanela
     * @category Core Commands
     * @module
     * @description - Procura por pela janela que contém o nome indicado por parâmetro e tecla "ESC" para fechar.
     * Caso a seguinte mensagem apareça "Você possui modificações a serem salvas. Deseja sair assim mesmo?", o botão "Sim" será clicado automaticamente.
     * Após isso o teste espera que a janela seja fechada antes de prosseguir
     * Observação: Para utilizar essa função, a janela precisa estar com foco.
     * @param {String} nomeDaJanela - Nome da janela que será fechada
     * @example browser.fechaJanela("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDaJanela) {
        this.keys(this.Keys.ESCAPE);
        this.element("css selector", loc.geral.messageBox, function (visible) {
            if (visible.status != -1)
                this.useXpath()
                    .waitForElementPresent("//span[text()='Sim']")
                    .click("//span[text()='Sim']")
        })
        this.useXpath()
            .assert.elementNotPresent("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']")
            .useCss();

        return this;
    },
};