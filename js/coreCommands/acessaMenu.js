// @ts-nocheck
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function acessaMenu
     * @category Core commands
     * @module
     * @description - Abre um módulo pelo menu do sistema
     * @param {String} nomeDoMenu - Nome do menu
     * @example browser.acessaMenu("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDoMenu) {
        if (!nomeDoMenu) {
            this.assert.fail("O parâmetro 'nomeDoMenu' não foi informado")
            return this;
        }

        this.useXpath()
            .moveToElement("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", 25, 25)
            .pause(300)
            .click("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']")
            .useCss();
    },
};