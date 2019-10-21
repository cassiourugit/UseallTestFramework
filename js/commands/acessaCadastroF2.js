// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function acessaCadastroF2
     * @category Commands
     * @class
     * @description - Acessa um cadastro através do menu F2
     * @param {String} link - Nome do cadastro no menu
     * @example 
     * browser.acessaCadastroF2("Tipos de documentos")
     * @author Cássio
    */
    command: function (nome) {
        this.keys(this.Keys.F2)
            .waitForElementPresent(util.geral.janelaF2)
            .waitForElementVisible(util.geral.campoBuscaF2)
            .sendKeys(util.geral.campoBuscaF2, nome)
            .waitForElementVisible("div[id^='use-pesquisageral-panel'] div[title='" + nome + "']")
            .click("div[id^='use-pesquisageral-panel'] div[title='" + nome + "']")
            .waitForElementNotPresent(util.geral.janelaF2Fechada)
            .useXpath()
            .waitForElementPresent('//span[contains(text(), "' + nome + '")]')
            .assert.elementPresent('//span[contains(text(), "' + nome + '")]', "A aba do cadastro não foi aberta corretamente.")
            .useCss()

        return this;
    },
};