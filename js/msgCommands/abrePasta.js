// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function abrePasta
     * @category Msg Commands
     * @module
     * @description - Abre a pasta que possui o nome recebido por parâmetro
     * @param {String} nomeDaPasta - Nome da pasta que deve ser aberta
     * @example 
     * browser.abrePasta("Pasta X")
     * @author Cássio
    */
    command: function (nomeDaPasta) {
        this.useXpath()
            .waitForElementVisible("'xpath', //div[starts-with(@id, 'menu-lateral-mensagens')]//span[text()= '" + nomeDaPasta + "']")
            .click("//div[starts-with(@id, 'menu-lateral-mensagens')]//span[text()= '" + nomeDaPasta + "']")
            .assert.attributeContains("//div[starts-with(@id, 'menu-lateral-mensagens')]//span[text()= '" + nomeDaPasta + "']" + "/ancestor::table", "class", "selected")
            .useCss();
        return this;
    },
};