// @ts-nocheck
const loc = require("../locators");

module.exports = {
    /**
     * @function acessaCadastro
     * @category Commands
     * @class
     * @description - Acessa um cadastro através do menu de Listas
     * @param {String} link - Nome do cadastro no menu
     * @example 
     * browser.acessaCadastro("Tipos de documentos")
     * @author Cássio
    */
    command: function (link) {
        this.click(loc.geral.btnListas)
            .moveToElement('link text', link, 10, 10)
            .click('link text', link)
            .useXpath()
            .waitForElementPresent('//span[contains(text(), "' + link + '")]')
            .assert.elementPresent('//span[contains(text(), "' + link + '")]', "A aba do cadastro não foi aberta corretamente.")
            .useCss()

        return this;
    },
};