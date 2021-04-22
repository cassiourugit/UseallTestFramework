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
                    this.pause(200)

                    this.getAttribute('xpath', elemento, 'id', function (result) {
                        //Se houver um loader no botão, aguarda até ele finalizar
                        str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                        elementoLoader = "//a[@id='" + str + "']/descendant::span[@data-ref='btnIconEl'][contains(@class, 'icone-loader-button')]";

                        this.element('xpath', elementoLoader, function (elem) {
                            if (elem.status != -1) {
                                this.waitForElementNotPresent('xpath', elementoLoader, 10000, "Loader do botão não desapareceu após o timeout máximo definido por padrão")
                            }
                        })

                        //Se houver uma listagem, aguarda o carregamento da mesma
                        this.element('css selector', loc.geral.loadmask, function (elem) {
                            if (elem.status != -1) {
                                this.waitForElementNotPresent('css selector', loc.geral.loadmask)
                            }
                        }).useCss()
                        this.element('css selector', loc.geral.messageBox, function (messageBox) {
                            if (messageBox.status != -1) {
                                this.getAttribute('css selector', loc.geral.messageBox, 'innerText', function (texto) {
                                    this.assert.elementNotPresent(loc.geral.messageBox, "A mensagem de erro a seguir apareceu na tela: ( " + texto.value + " )")
                                })
                            }
                        })
                    });
                })
        } else {
            this
                .waitForElementPresent('css selector', elemento, "O elemento não está presente após o tempo máximo previsto")
                .click('css selector', elemento, function () {
                    this.pause(200)

                    this.getAttribute('css selector', elemento, 'id', function (result) {
                        //Se houver um loader no botão, aguarda até ele finalizar
                        str = util.aplicaRegexString(result.value, /.*\d+(?=\-)/g);
                        elementoLoader = "//a[@id='" + str + "']/descendant::span[@data-ref='btnIconEl'][contains(@class, 'icone-loader-button')]";

                        this.element('xpath', elementoLoader, function (elem) {
                            if (elem.status != -1) {
                                this.waitForElementNotPresent('xpath', elementoLoader, 10000, "Loader do botão não desapareceu após o timeout máximo definido por padrão")
                            }
                        })

                        //Se houver uma listagem, aguarda o carregamento da mesma
                        this.element('css selector', loc.geral.loadmask, function (elem) {
                            if (elem.status != -1) {
                                this.waitForElementNotPresent('css selector', loc.geral.loadmask)
                            }
                        }).useCss()
                        this.element('css selector', loc.geral.messageBox, function (messageBox) {
                            if (messageBox.status != -1) {
                                this.getAttribute('css selector', loc.geral.messageBox, 'innerText', function (texto) {
                                    this.assert.elementNotPresent(loc.geral.messageBox, "A mensagem de erro a seguir apareceu na tela: ( " + texto.value + " )")
                                })
                            }
                        })
                    });
                })
        }
        return this;
    },
};

