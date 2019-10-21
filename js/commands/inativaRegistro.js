// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function inativaRegistro
     * @category Commands
     * @class
     * @description - Inativa o registro que está aberto na tela
     * @example browser.inativaRegistro()
     * @author Cássio
    */
    command: function () {
        this.waitForElementVisible(util.geral.linkAtivo)
            .click(util.geral.linkAtivo)
            .waitForElementPresent(util.geral.messageBox)
            .assert.attributeContains(util.geral.messageBox, "textContent", "Ao inativar, não será mais possível utilizar o registro no sistema, confirma?")
            .useXpath()
            .click(util.geral.btnSimMessageBoxX)
            .useCss()
            .assert.attributeContains(util.geral.linkAtivo, "textContent", "Ativar");

        return this;
    },
};