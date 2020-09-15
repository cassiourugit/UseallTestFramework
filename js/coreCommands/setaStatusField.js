// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function setaStatusField
     * @category Core commands
     * @module
     * @description - Marca/Desmarca o status no campo
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo searchfield
     * @param {string} status - Status a ser setado
     * @param {string} [marcar = true] - ***Opcional*** Defini se o status será marcado ou desmarcado, por padrão é ***true***. Caso deseja que o status seja desmarcado, mande ***false***
     * @example 
     * browser.setaStatusField("input[data-test-id='statusField']", "Aberto")
     * @author Cássio
    */
    command: function (campo, status, marcar = "true") {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (status == "" || status == null || status == undefined) {
            this.assert.fail("O parâmetro 'status' não foi informado")
            return this;
        }


        if (util._isXpath(campo)) {
            this
                .useXpath()
                .click(campo)
                .getAttribute("//li[text()= '" + status + "']", "aria-selected", function (result) {
                    if (marcar != result.value) {
                        this.click("//li[text()= '" + status + "']")
                    }
                })
                .click(campo)
                .useCss();

        } else {
            this
                .useCss()
                .click(campo)
                .getAttribute("xpath", "//li[text()= '" + status + "']", "aria-selected", function (result) {
                    if (marcar != result.value) {
                        this.click("xpath", "//li[text()= '" + status + "']")
                    }
                })
                .click(campo)
        }

        return this;
    },
};