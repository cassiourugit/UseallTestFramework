// @ts-nocheck
const util = require("../utils/util");
const config = require("../utils/configDefinitions");

module.exports = {
    /**
     * @function aguardaElementoReaparecer
     * @category Core commands
     * @module
     * @description - Aguarda o elemento informado desaparecer e aparecer novamente, essa função normalmente é necessária quando
     * o salvar de algum processo fecha e abre novamente a janela, sem dar nenhum feedback. Dessa forma é possível garantir que o sistema está pronto para prosseguir com o teste
     * @param {string} campo - Localizador **Css** ou **Xpath** do campo
     * @example 
     * browser.aguardaElementoReaparecer("input[data-test-id='Searchfield']")
     * @author Cássio
    */
    command: function (campo) {
        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (util._isXpath(campo)) {
            this.useXpath()
                .getAttribute('xpath', campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                    let id = "[id^='" + str + "']";

                    this.waitForElementNotPresent('css selector', id, "Elemento: " + id + " não desapareceu após o tempo máximo previsto")
                        .waitForElementPresent('xpath', campo, "Elemento: " + campo + " não reapareceu após o tempo máximo previsto")
                        .useCss()

                    return this;
                })
        } else {
            this.useCss()
                .getAttribute('css selector', campo, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                    let id = "[id^='" + str + "']";

                    this.waitForElementNotPresent('css selector', id, "Elemento: " + id + " não desapareceu após o tempo máximo previsto")
                        .waitForElementPresent('css selector', campo, "Elemento: " + campo + " não reapareceu após o tempo máximo previsto")

                    return this;
                })
        }
    },
};


