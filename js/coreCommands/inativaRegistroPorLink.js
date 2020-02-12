// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function inativaRegistroPorLink
     * @category Core commands
     * @module
     * @description - Inativa o registro que está aberto na tela
     * @example browser.inativaRegistroPorLink()
     * @author Cássio
    */
    command: function () {
        this.waitForElementVisible(loc.geral.linkAtivo)
            .click(loc.geral.linkAtivo)
            .waitForElementPresent(loc.geral.messageBox)
            .assert.attributeContains(loc.geral.messageBox, "textContent", "Ao inativar, não será mais possível utilizar o registro no sistema, confirma?")
            .useXpath()
            .click(loc.geral.btnSimMessageBoxX)
            .useCss()
            .assert.attributeContains(loc.geral.linkAtivo, "textContent", "Ativar");

        return this;
    },
};