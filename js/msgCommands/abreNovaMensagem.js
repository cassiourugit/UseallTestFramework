// @ts-nocheck
const loc = require("../../page_objects/useallLocators");

module.exports = {
    /**
     * @function abreNovaMensagem
     * @category Msg Commands
     * @module
     * @description - Abre a janela para enviar uma nova mensagem
     * @example 
     * browser.abreNovaMensagem()
     * @author Cássio
    */
    command: function () {
        this.click(loc.mensageria.novaMensagemButtom)
            .waitForElementVisible(loc.mensageria.painelNovaMensagem)
            .perform(() => {
                this.getAttribute(loc.mensageria.iframeMensagem, 'id', (result) => {
                    this.frame(result.value)
                        .waitForElementPresent(loc.mensageria.iframeTinymce);
                });
            })
            .frame();

        return this;
    },
};