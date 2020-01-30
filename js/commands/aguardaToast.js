// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function aguardaToast
     * @category Commands
     * @module
     * @description - Aguarda até que o Toast indicando que o registro foi salvo apareca, e depois aguarda mais 400 milisegundos antes de prosseguir o teste
     * @param {string} [mensagemToast = null] - **Opcional** Texto que deve ser exibido no toast
     * @example browser.aguardaToast("Registro salvo com sucesso!")
     * @author Cássio
    */
    command: function (mensagemToast = null) {
        this.useCss()
            .waitForElementPresent(loc.geral.toast);

        if (mensagemToast != null) {
            this.waitForElementVisible(loc.geral.toast);
            this.getAttribute(loc.geral.toast, "textContent", function (result) {
                this.assert.containsText(loc.geral.toast, mensagemToast, "O toast não exibiu a mensagem correta, a mensagem exibida foi: " + result.value)
            });
        }

        this.pause(500);

        return this;
    },
};