// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function setaCampoDeTextoMensagem
     * @category Msg Commands
     * @module
     * @description - Seta o texto informado no corpo da mensagem
     * @param {String} texto - Texto a ser inserido no campo
     * @example 
     * browser.setaCampoDeTextoMensagem("Texto da mensagem")
     * @author Cássio
    */
    command: function (texto) {
        this.perform(() => {
            this.getAttribute(loc.mensageria.iframeMensagem, 'id', (result) => {
                this.frame(result.value)
                    .waitForElementVisible(loc.mensageria.iframeTinymce)
                    .setValue(loc.mensageria.iframeTinymce, texto);
            });
        });
        this.frame();

        return this;
    }
};