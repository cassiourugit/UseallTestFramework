// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function aguardaListagem
     * @category Commands
     * @module
     * @description - Após acessar uma lista ou pesquisar, o sistema carrega a listagem. Essa função aguarda até que a listagem esteja carregada antes de interagir com elementos da grid
     * @example browser.aguardaListagem()
     * @author Cássio
    */
    command: function () {
        this.pause(200)
            .waitForElementNotPresent(loc.geral.loadmask);

        return this;
    },
};