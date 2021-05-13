// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function aguardaToast
     * @category Core commands
     * @module
     * @description - Aguarda até que o Toast indicando que o registro foi salvo apareca, e depois aguarda mais 400 milisegundos antes de prosseguir o teste
     * @param {string} [mensagemToast = null] - **Opcional** Texto que deve ser exibido no toast
     * @example browser.aguardaToast("Registro salvo com sucesso!")
     * @author Cássio
    */
    command: function (mensagemToast = null) {
        this.useCss()
            .waitForElementPresent("css selector", loc.geral.toast, "Não foi encontrado nenhum toast na tela");

        if (mensagemToast != null) {
            this.waitForElementPresent("css selector", loc.geral.toast, "Não foi encontrado nenhum toast na tela");
            this.getAttribute(loc.geral.toast, "textContent", function (result) {
                this.assert.containsText(loc.geral.toast, mensagemToast, "O toast não exibiu a mensagem correta, a mensagem exibida foi: " + result.value)

                this.pause(800);

                this.element("css selector", loc.geral.toast, function (present) {
                    if (present.status != -1) {
                        this.execute(
                            function () {
                                Use.Notify._$currentToast.close()
                            },
                            []
                        );
                    }
                })
            });

            return this;
        }

        this.pause(800);

        this.element("css selector", loc.geral.toast, function (present) {
            if (present.status != -1) {
                this.execute(
                    function () {
                        Use.Notify._$currentToast.close()
                    },
                    []
                );
            }
        })

        return this;
    },
};