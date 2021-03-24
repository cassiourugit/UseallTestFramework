// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function aguardaListagem
     * @category Core commands
     * @module
     * @description - Após acessar uma lista ou pesquisar, o sistema carrega a listagem. Essa função aguarda até que a listagem esteja carregada antes de interagir com elementos da grid
     * @example browser.aguardaListagem()
     * @author Cássio
    */
    command: function () {
        this.pause(200)
            .waitForElementNotPresent('css selector', loc.geral.loadmask, "O loader da listagem não desapareceu após o tempo máximo previsto")
            .pause(500)

        return this;
    },
};