// @ts-nocheck
const util = require("../utils/util");
module.exports = {
    /**
     * @function limpaCampoHard
     * @category Core commands
     * @module
     * @description - Limpa um campo de texto
     * @param {String} campo - Localizador **Css** ou **Xpath** do campo combobox que deve ser limpo
     * @example browser.limpaCampoHard("input[data-test-id='campo']")
     * @author Cássio
    */
    command: function (campo) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }


        if (util._isXpath(campo)) {
            this.useXpath()
                .waitForElementVisible('xpath', campo)
                .execute(function (campo) {
                    xElement = document.evaluate(campo, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    for (let i = 0; i < xElement.snapshotLength; i++) {
                        xElement.snapshotItem(i).value = null;
                    }
                }, [campo]);

            this.useCss();

            return this;
        }

        this.waitForElementVisible(campo)
            .execute(
                function (campo) {
                    const field = document.querySelector(campo);
                    field.value = null;
                },
                [campo]
            );

        return this;
    },
};