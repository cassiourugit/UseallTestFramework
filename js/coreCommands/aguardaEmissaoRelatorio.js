// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function aguardaEmissaoRelatorio
     * @category Core commands
     * @module
     * @description - Após emitir um espelho ou relatório, essa função espera até que o mesmo seja emitido com sucesso. O tempo máximo de espera é 30 segundos. Caso haja alguma falha, a mensagem de erro é capturada e exibida no resultado do teste
     * @example browser.aguardaEmissaoRelatorio()
     * @author Cássio
    */
    command: function () {
        this.pause(200)
            .useXpath()
            .waitForElementNotPresent('xpath', loc.geral.loadmaskRelX, 30000, "O loader do relatório não desapareceu após o tempo máximo previsto de 30 segundos")
            .useCss()
            .element("css selector", loc.geral.messageBox, function (visivel) {
                if (visivel.status != -1) {
                    this.getAttribute(loc.geral.messageBox, "textContent", function (result) {
                        this.verify.fail(result.value);
                    });
                }
            });

        return this;
    },
};