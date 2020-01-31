// @ts-nocheck
const loc = require("../../page_objects/useallLocators");

module.exports = {
    /**
     * @function abreMensageria
     * @category Msg Commands
     * @module
     * @description - Abre a mensageria na página inicial das mensagens
     * @example 
     * browser.abreMensageria()
     * @author Cássio
    */
    command: function () {
        this.waitForElementVisible(loc.mensageria.iconeMensagens)
            .click(loc.mensageria.iconeMensagens)
            .waitForElementVisible(loc.mensageria.listaMensagens, 5000, "A lista de mensagens não foi carregada.");

        return this;
    },
};