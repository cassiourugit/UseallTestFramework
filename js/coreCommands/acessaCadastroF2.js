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
            .waitForElementPresent('css selector', loc.geral.janelaF2, "A janela de busca F2 não apareceu após o tempo máximo previsto")
            .waitForElementVisible('css selector', loc.geral.campoBuscaF2, "A janela de busca F2 não apareceu após o tempo máximo previsto")
            .setValue(loc.geral.campoBuscaF2, nome)
            .waitForElementVisible('css selector', "div[id*='pesquisageral-panel'] div[title='" + nome + "']", "Não foi encontrada a opção com a palavra " + nome + " no tempo máximo previsto")
            .pause(500)
            .click('css selector', "div[id*='pesquisageral-panel'] div[title='" + nome + "']")
            .waitForElementPresent('css selector', loc.geral.janelaF2Fechada, "A janela de busca F2 não foi fechada após o tempo máximo previsto");
        this.useXpath()
            .waitForElementPresent('xpath', '//span[contains(text(), "' + nome + '")]', "A aba do cadastro não foi aberta após o tempo máximo previsto")
            .useCss()

        return this;
    },
};