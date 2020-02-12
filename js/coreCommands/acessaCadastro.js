// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function acessaCadastro
     * @category Core commands
     * @module
     * @description - Acessa um cadastro através do menu de Listas
     * @param {String} link - Nome do cadastro no menu
     * @example 
     * browser.acessaCadastro("Tipos de documentos")
     * @author Cássio
    */
    command: function (link) {
        if (link == "" || link == null || link == undefined) {
            this.assert.fail("O parâmetro 'link' não foi informado")
            return this;
        }

        this.useCss()
            .click(loc.geral.btnListas)
            .moveToElement('link text', link, 10, 10)
            .click('link text', link)
            .useXpath()
            .waitForElementPresent('//span[contains(text(), "' + link + '")]', "A aba do cadastro não foi aberta corretamente.")
            .useCss()

        return this;
    },
};