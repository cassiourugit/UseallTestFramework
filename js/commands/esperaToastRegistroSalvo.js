// @ts-nocheck
const util = require("../page_objects/util");

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
            .waitForElementPresent(util.geral.toast)
            .pause(400);

        return this;
    },
};