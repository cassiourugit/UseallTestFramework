// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");
let ids = [];

module.exports = {
    /**
     * @function removeItemSearchFieldMulti
     * @category Core commands
     * @module
     * @description - Remove o registro indicado por parametro da listagem do searchfield multi-seleção
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo do tipo searchfield
     * @param {number} texto - Texto do item que deve ser removido da listagem do searchfield
     * @example 
     * browser.removeItemSearchFieldMulti("input[data-test-id='Searchfield']", "Item")
     * @author Cássio
    */
    command: async function (campo, texto) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (texto == "" || texto == null || texto == undefined) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }

        if (util._isXpath(campo)) {
            this.waitForElementPresent('xpath', campo);
            this.getAttribute('xpath', campo, 'id', function (result) {
                let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                let btnRemover = "//input[starts-with(@id, '" + str + "')]/ancestor::div[starts-with(@id, 'container-searchfield-multiselect')] //div[contains(text(), '" + texto + "')]/ancestor::tr/descendant::div[@data-qtip='Remover']"

                this.click('xpath', btnRemover)
                    .waitForElementNotPresent('xpath', btnRemover, "Não foi possível remover o item: " + texto + " da listagem")
            })
                .useCss();

            return this;
        } else {
            this.waitForElementPresent('css selector', campo);
            this.getAttribute('css selector', campo, 'id', function (result) {
                let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                let btnRemover = "//input[starts-with(@id, '" + str + "')]/ancestor::div[starts-with(@id, 'container-searchfield-multiselect')] //div[contains(text(), '" + texto + "')]/ancestor::tr/descendant::div[@data-qtip='Remover']"

                this.click('xpath', btnRemover)
                    .waitForElementNotPresent('xpath', btnRemover, "Não foi possível remover o item: " + texto + " da listagem")
            });

            return this;
        }
    },
};