// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function acessaMenu
     * @category Commands
     * @module
     * @description - Abre um módulo pelo menu do sistema
     * @param {String} nomeDoMenu - Nome do menu
     * @example browser.acessaMenu("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDoMenu) {
        this.useXpath()
            .moveToElement("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", 10, 10)
            .waitForElementPresent("//div[@role='tooltip'][@aria-hidden='false']")
            .click("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']")
            .waitForElementPresent(loc.geral.menuAtivoX)
            .assert.cssProperty("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", "color", "rgba(36, 152, 219, 1)")
            .useCss();

        return this;
    },
};