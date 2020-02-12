// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function inativaRegistroPorMaisOpcoes
     * @category Core commands
     * @module
     * @description - Inativa o registro que está aberto na tela
     * @param {string} celula - Localizador **Css** da célula na grid que deve ser inativada
     * @param {string} texto - Texto que deve estar sendo exibido na célula
     * @example browser.inativaRegistroPorMaisOpcoes(".x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)", "texto")
     * @author Cássio
    */
    command: function (celula, texto) {
        if (celula == "" || celula == null || celula == undefined) {
            this.assert.fail("O parâmetro 'celula' não foi informado")
            return this;
        }

        if (texto == "" || texto == null || texto == undefined) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }

        this.waitForElementVisible(celula)
            .assert.attributeEquals(celula, 'textContent', texto)
            .click(celula)
            .verify.cssProperty(celula, "border-right-color", "rgba(60, 190, 236, 0.5)", "O registro que deve ser inativado não está selecionado.")
            .useXpath()
            .click(loc.geral.btnMaisOpcoesX)
            .click("//span[contains(text(),'Inativar')]")
            .useCss();
        this.aguardaToast();
        this.validaRegistroInativo(celula);

        return this;
    },
};