// @ts-nocheck
const util = require("../utils/util");
const loc = require("../commumLocators")

module.exports = {
    /**
     * @function clica
     * @category Core commands
     * @module
     * @description - Clica no elemento e valida se nenhuma mensagem de erro do sistema apareceu na tela.
     * Se aparecer, a mensagem de erro será gravada e o teste será finalizado mostrando o erro.
     * @param {string} elemento - Localizador **Css** ou **Xpath** do elemento que você deseja clicar
     * @example 
     * browser.clica("input[data-test-id='btn_novo']")
     * @author Cássio
    */
    command: function (elemento) {
        if (elemento == "" || elemento == null || elemento == undefined) {
            this.assert.fail("O parâmetro 'elemento' não foi informado")
            return this;
        }

        if (util._isXpath(elemento)) {
            this.useXpath()
                .waitForElementPresent('xpath', elemento, "O elemento não está presente após o tempo máximo previsto")
                .click('xpath', elemento, function () {
                    this.pause(500)
                    this.element('css selector', loc.geral.messageBox, function (messageBox) {
                        if (messageBox.status != -1) {
                            this.isVisible('css selector', loc.geral.messageBox, function (visible) {
                                if (visible.value) {
                                    this.getAttribute('css selector', loc.geral.messageBox, 'innerText', function (texto) {
                                        this.assert.not.elementPresent(loc.geral.messageBox, "A mensagem de erro a seguir apareceu na tela: ( " + texto.value + " )")
                                    })
                                }
                            })
                        }
                    })
                });
        } else {
            this
                .waitForElementPresent('css selector', elemento, "O elemento não está presente após o tempo máximo previsto")
                .click('css selector', elemento, function () {
                    console.log("Entrei no click")
                    this.pause(500)
                    this.element('css selector', loc.geral.messageBox, function (messageBox) {
                        console.log("Entrei no element")
                        console.log("Status: " + messageBox.status)
                        if (messageBox.status != -1) {
                            this.isVisible('css selector', loc.geral.messageBox, function (visible) {
                                if (visible.value) {
                                    this.getAttribute('css selector', loc.geral.messageBox, 'innerText', function (texto) {
                                        this.assert.not.elementPresent(loc.geral.messageBox, "A mensagem de erro a seguir apareceu na tela: ( " + texto.value + " )")
                                    })
                                }
                            })
                        }
                    })
                });
        }
        return this;
    },
};

