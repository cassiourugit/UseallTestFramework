// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function maisOpcoesComposto
     * @category Core commands
     * @module
     * @description - Seleciona a opção desejada no menu Mais opções composto, onde existem opções, dentro de opções
     * @param {string} botao - Localizador **Css** ou **Xpath** do botão Mais opções
     * @param {string} opcao - Nome da primeira opção a ser selecionada
     * @param {string} opcao2 - Nome da segunda opção a ser selecionada
     * @example 
     * browser.maisOpcoesComposto("//div[starts-with(@id, 'lista-clientes')]//span[text()= 'Mais opções']", "Rastrear", "Pedidos")
     * @author Cássio
    */
    command: function (botao, opcao, opcao2) {
        if (!botao) {
            this.assert.fail("O parâmetro 'botao' não foi informado")
            return this;
        }

        if (!opcao) {
            this.assert.fail("O parâmetro 'opcao' não foi informado")
            return this;
        }

        if (!opcao2) {
            this.assert.fail("O parâmetro 'opcao2' não foi informado")
            return this;
        }


        if (util._isXpath(botao)) {
            this.useXpath()
                .waitForElementVisible('xpath', botao, "O botão mais opções não foi encontrado no tempo máximo previsto")
                .click(botao)
                .waitForElementVisible('xpath', "//span[contains(@id,'menuitem')][contains(text(),'" + opcao + "')]", "A primeira opção não foi encontrada")
                .click('xpath', "//span[contains(@id,'menuitem')][contains(text(),'" + opcao + "')]")
                .waitForElementVisible('xpath', "//div[starts-with(@id, 'menuitem')] //span[text()= '" + opcao2 + "']", "A segunda opção não foi encontrada")
                .moveToElement('xpath', "//div[starts-with(@id, 'menuitem')] //span[text()= '" + opcao2 + "']", 0, 0)
                .click('xpath', "//div[starts-with(@id, 'menuitem')] //span[text()= '" + opcao2 + "']")
                .useCss();
        } else {
            this.useCss()
                .waitForElementVisible('css selector', botao, "O botão mais opções não foi encontrado no tempo máximo previsto")
                .click(botao)
                .useXpath()
                .waitForElementVisible('xpath', "//span[contains(@id,'menuitem')][contains(text(),'" + opcao + "')]", "A primeira opção não foi encontrada")
                .click('xpath', "//span[contains(@id,'menuitem')][contains(text(),'" + opcao + "')]")
                .waitForElementVisible('xpath', "//div[starts-with(@id, 'menuitem')] //span[text()= '" + opcao2 + "']", "A segunda opção não foi encontrada")
                .moveToElement('xpath', "//div[starts-with(@id, 'menuitem')] //span[text()= '" + opcao2 + "']", 0, 0)
                .click('xpath', "//div[starts-with(@id, 'menuitem')] //span[text()= '" + opcao2 + "']")
                .useCss()
        }

        return this;
    },
};


