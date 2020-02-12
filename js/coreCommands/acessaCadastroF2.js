// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function acessaCadastroF2
     * @category Core commands
     * @module
     * @description - Acessa um cadastro através do menu F2
     * @param {String} link - Nome do cadastro no menu
     * @example 
     * browser.acessaCadastroF2("Tipos de documentos")
     * @author Cássio
    */
    command: function (nome) {
        if (nome == "" || nome == null || nome == undefined) {
            this.assert.fail("O parâmetro 'nome' não foi informado")
            return this;
        }

        this.keys(this.Keys.F2)
            .waitForElementPresent(loc.geral.janelaF2)
            .waitForElementVisible(loc.geral.campoBuscaF2)
            .sendKeys(loc.geral.campoBuscaF2, nome)
            .waitForElementVisible("div[id^='use-pesquisageral-panel'] div[title='" + nome + "']")
            .click("div[id^='use-pesquisageral-panel'] div[title='" + nome + "']")
            .waitForElementNotPresent(loc.geral.janelaF2Fechada)
            .useXpath()
            .waitForElementPresent('//span[contains(text(), "' + nome + '")]', "A aba do cadastro não foi aberta corretamente.")
            .useCss()

        return this;
    },
};