// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function aguardaEmissaoRelatorio
     * @category Commands
     * @class
     * @description - Após emitir um espelho ou relatório, essa função espera até que o mesmo seja emitido com sucesso. O tempo máximo de espera é 30 segundos. Caso haja alguma falha, a mensagem de erro é capturada e exibida no resultado do teste
     * @example browser.aguardaRemissaoRelatorio()
     * @author Cássio
    */
    command: function () {
        this.pause(200)
            .useXpath()
            .waitForElementNotPresent(util.geral.loadmaskRelX, 30000)
            .useCss()
            .element("css selector", util.geral.messageBox, function (visivel) {
                if (visivel.status != -1) {
                    this.getAttribute(util.geral.messageBox, "textContent", function (result) {
                        this.assert.ok(false, result.value);
                    });
                }
            });

        return this;
    },
};