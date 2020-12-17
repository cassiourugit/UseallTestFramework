// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function fechaJanela
     * @category Core commands
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
        if (nomeDaJanela == "" || nomeDaJanela == null || nomeDaJanela == undefined) {
            this.assert.fail("O parâmetro 'nomeDaJanela' não foi informado")
            return this;
        }

        this.keys(this.Keys.ESCAPE);
        this.element("css selector", loc.geral.messageBox, function (present) {
            if (present.status != -1)
                this.isVisible('xpath', '//span[text()="Sim"]', function(visible) {
                if (visible.value) {
                        this.click('xpath', "//span[text()='Sim']")
                    }
              });              
        });

        this.useXpath()
            .assert.not.elementPresent("//div[starts-with(@class, 'x-window-header')]//div[text()= '" + nomeDaJanela + "']", "A janela não foi fechada.")
            .useCss();

        return this;
    },
};