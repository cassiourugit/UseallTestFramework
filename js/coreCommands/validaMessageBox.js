// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function validaMessageBox
     * @category Core commands
     * @module
     * @description - Responde a messagebox com a opção desejada
     * @param {string} mensagem - Texto com a mensagem que deve ser exibida pela messagebox
     * @param {string} botao - Nome do botão que deve ser clicado
     * @example 
     * browser.validaMessageBox("Tem certeza que deseja remover o registro?", "Sim")
     * @author Cássio
    */
    command: function (mensagem, botao) {
        if (!mensagem) {
            this.assert.fail("O parâmetro 'mensagem' não foi informado")
            return this;
        }

        if (!botao) {
            this.assert.fail("O parâmetro 'botao' não foi informado")
            return this;
        }

        this.useXpath()
            .waitForElementPresent("'xpath', //div[starts-with(@id, 'use-messagebox')] | //div[starts-with(@id, 'messagebox')]", "Não existe nenhuma messagebox aberta na tela")
            .assert.visible("//div[text()= \"" + mensagem + "\"]", "A mensagem esperada não foi encontrada na messagebox")
            .assert.visible("//div[text()= \"" + mensagem + "\"] //ancestor::div[starts-with(@id, \"use-messagebox\")] //child::span[text()= \"" + botao + "\"] | //div[text()= \"" + mensagem + "\"] //ancestor::div[starts-with(@id, \"messagebox\")] //child::span[text()= \"" + botao + "\"]", "O botão informado não foi encontrado na tela")
            .click("//div[text()= \"" + mensagem + "\"] //ancestor::div[starts-with(@id, \"use-messagebox\")] //child::span[text()= \"" + botao + "\"] | //div[text()= \"" + mensagem + "\"] //ancestor::div[starts-with(@id, \"messagebox\")] //child::span[text()= \"" + botao + "\"]")
            .useCss();

        return this;
    },
};