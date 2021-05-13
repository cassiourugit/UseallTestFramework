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
                .waitForElementVisible('xpath', botao, "O botão mais opções não foi encontrado no tempo máximo previsto")
                .getAttribute('xpath', botao, 'id', function (resultAttr) {
                    let str = util.aplicaRegexString(resultAttr.value, /.*\d+(?=\-)?/g);
                    let btnFull = "a[id='" + str + "']";

                    this.getElementSize('css selector', btnFull, function (resultSize) {
                        let height = Math.trunc(resultSize.value.height / 2);
                        let width = Math.trunc(resultSize.value.width - (resultSize.value.width * .14));

                        this.clickOffset(btnFull, width, height)
                            .waitForElementVisible('xpath', "//div[@role='menu'][@aria-expanded='true'] //span[contains(@id,'menuitem')][contains(text(),'" + opcao + "')]", "A opção desejada não foi encontrada")
                            .click('xpath', "//div[@role='menu'][@aria-expanded='true'] //span[contains(@id,'menuitem')][contains(text(),'" + opcao + "')]")
                            .useCss();
                    })
                })

        } else {
            this.waitForElementVisible('css selector', botao, "O botão mais opções não foi encontrado no tempo máximo previsto")
                .getAttribute('css selector', botao, 'id', function (resultAttr) {
                    let str = util.aplicaRegexString(resultAttr.value, /.*\d+(?=\-)?/g);
                    let btnFull = "a[id='" + str + "']";

                    this.getElementSize('css selector', btnFull, function (resultSize) {
                        let height = Math.trunc(resultSize.value.height / 2);
                        let width = Math.trunc(resultSize.value.width - (resultSize.value.width * .14));

                        this.clickOffset(btnFull, width, height)
                            .waitForElementVisible('xpath', "//div[@role='menu'][@aria-expanded='true'] //span[contains(@id,'menuitem')][contains(text(),'" + opcao + "')]", "A opção desejada não foi encontrada")
                            .click('xpath', "//div[@role='menu'][@aria-expanded='true'] //span[contains(@id,'menuitem')][contains(text(),'" + opcao + "')]")
                            .useCss();
                    })
                })
        }

        return this;
    },
};