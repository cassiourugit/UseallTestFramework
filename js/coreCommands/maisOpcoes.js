// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function maisOpcoes
     * @category Core commands
     * @module
     * @description - Seleciona a opção desejada no menu Mais opções
     * @param {string} botao - Localizador **Css** ou **Xpath** do botão Mais opções
     * @param {string} opcao - Nome da opção a ser selecionada
     * @example 
     * browser.maisOpcoes("//div[starts-with(@id, 'lista-clientes')]//span[text()= 'Mais opções']", "Histórico")
     * @author Cássio
    */
    command: function (botao, opcao) {
        if (!botao) {
            this.assert.fail("O parâmetro 'botao' não foi informado")
            return this;
        }

        if (!opcao) {
            this.assert.fail("O parâmetro 'opcao' não foi informado")
            return this;
        }

        if (util._isXpath(botao)) {
            this.useXpath()
                .waitForElementVisible(botao)
                .click(botao)
                .waitForElementVisible("//span[contains(text(),'" + opcao + "')]")
                .click("//span[contains(text(),'" + opcao + "')]")
                .useCss();
        } else {
            this.waitForElementVisible(botao)
                .click(botao)
                .useXpath()
                .waitForElementVisible("//span[contains(text(),'" + opcao + "')]")
                .click("//span[contains(text(),'" + opcao + "')]")
                .useCss()
        }

        return this;
    },
};