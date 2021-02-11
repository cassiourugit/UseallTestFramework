// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function destacaElemento
     * @category Core commands
     * @module
     * @description - Destaca o elemento recebido por parâmetro
     * @param {String} element - Localizador **Css** ou **Xpath** do elemento
     * @example util.destacaElemento("div[id='elemento']");
     * @author Cássio
    */
    command: function (element) {
        if (element == "" || element == null || element == undefined) {
            this.assert.fail("O parâmetro 'element' não foi informado")
            return this;
        }

        if (util._isXpath(element)) {
            this.execute(function (element) {
                xElement = document.evaluate(element, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (let i = 0; i < xElement.snapshotLength; i++) {
                    xElement.snapshotItem(i).style.border = "thick dotted #ff0000";
                }
            }, [element]);
        }

        this.execute(function (element) {
            document.querySelector(element).style.border = "thick dotted #ff0000";
        }, [element]);
    },
};