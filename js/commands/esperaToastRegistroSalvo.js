// @ts-nocheck
const loc = require("../locators");

module.exports = {
    /**
     * @function esperaToastRegistroSalvo
     * @category Commands
     * @class
     * @description - Aguarda até que o Toast indicando que o registro foi salvo apareca, e depois aguarda mais 400 milisegundos antes de prosseguir o teste
     * @example browser.esperaToastRegistroSalvo()
     * @author Cássio
    */
    command: function () {
        this.useCss()
            .waitForElementPresent(loc.geral.toast)
            .pause(400);

        return this;
    },
};