// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function alteraModeloRelatorio
     * @category Core commands
     * @module
     * @description - Altera o modelo do relatório pelo informado por parâmetro
     * @param {string} nomeModelo - Nome do modelo que deve ser setado no campo
     * @example 
     * browser.alteraModeloRelatorio("Plano de ação com observação da ação executada")
     * @author Cássio
    */
    command: function (nomeModelo) {
        if (nomeModelo == "" || nomeModelo == null || nomeModelo == undefined) {
            this.assert.fail("O parâmetro 'nomeModelo' não foi informado")
            return this;
        }

        this.useXpath()
            .waitForElementVisible(loc.geral.campoModeloRelatorioX)
            .click(loc.geral.campoModeloRelatorioTriggerX)
            .waitForElementVisible('xpath', "//li[contains(text(),'" + nomeModelo + "')] | //li/div[contains(text(), '" + nomeModelo + "')]")
            .click('xpath', "//li[contains(text(),'" + nomeModelo + "')] | //li/div[contains(text(), '" + nomeModelo + "')]")
            .element("xpath", loc.geral.campoModeloRelatorioX, function (result) {
                this.elementIdAttribute(result.value.ELEMENT, "aria-expanded", function (attribute) {
                    if (attribute.value == "true") {
                        this.click(loc.geral.campoModeloRelatorioX)
                    }
                });
            })
            .useCss();

        return this;
    },
};