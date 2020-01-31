// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function alteraModeloRelatorio
     * @category Core Commands
     * @module
     * @description - Altera o modelo do relatório pelo informado por parâmetro
     * @param {string} nomeModelo - Nome do modelo que deve ser setado no campo
     * @example 
     * browser.alteraModeloRelatorio("Plano de ação com observação da ação executada")
     * @author Cássio
    */
    command: function (nomeModelo) {
        this.useXpath()
            .waitForElementVisible(loc.geral.campoModeloRelatorioX)
            .click(loc.geral.campoModeloRelatorioTriggerX)
            .waitForElementVisible("//li[contains(text(),'" + nomeModelo + "')] | //li/div[contains(text(), '" + nomeModelo + "')]")
            .click("//li[contains(text(),'" + nomeModelo + "')] | //li/div[contains(text(), '" + nomeModelo + "')]")
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