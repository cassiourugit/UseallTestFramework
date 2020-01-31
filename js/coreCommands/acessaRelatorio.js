// @ts-nocheck
module.exports = {
    /**
     * @function acessaRelatorio
     * @category Core Commands
     * @module
     * @description - Acessa um relatório através do menu de Relatórios
     * @param {String} link - Nome do relatório no menu
     * @example browser.acessaRelatorio("Espelho de plano de ação")
     * @author Cássio
    */
    command: function (link) {
        this.click('div[id^="tile-geral-relatorios"][id$="innerCt"]')
            .moveToElement('link text', link, 10, 10)
            .click('link text', link)
            .useXpath()
            .waitForElementPresent('//span[contains(text(), "' + link + '")]')
            .assert.elementPresent('//span[contains(text(), "' + link + '")]', "A aba do cadastro não foi aberta corretamente.")
            .useCss()

        return this;
    },
};