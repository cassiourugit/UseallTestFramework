// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function marcaMensagens
     * @category Msg Commands
     * @module
     * @description - Marca/Desmarca mensagens através da botão do menu, selecionando a opção passada por parâmetro 
     * @param {String} nomeDaOpcao - Nome da opção de marcação que deve ser selecionada
     * @example 
     * browser.marcaMensagens("Marcar lidos")
     * @author Cássio
    */
    command: function (nomeDaOpcao) {
        this.useXpath()
            .moveToElement(loc.mensageria.arrowCheckMarcarTodosX, 10, 10)
            .mouseButtonDown()
            .mouseButtonUp()
            .waitForElementVisible("//div[starts-with(@id, 'menu')]//span[text()= '" + nomeDaOpcao + "']")
            .click("//div[starts-with(@id, 'menu')]//span[text()= '" + nomeDaOpcao + "']")
        return this;
    },
};