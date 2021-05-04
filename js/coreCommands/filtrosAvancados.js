// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function filtrosAvancados
     * @category Core commands
     * @module
     * @description - Abre ou fecha o painel de filtros avançados
     * @param {string} btnFiltro - Localizador **Css** ou **Xpath** do filtro avançado
     * @param {boolean} [abrir = true] - ***Opcional*** Abre ou fecha o painel de filtros avançados com base nessa variável, se não informada, a função irá abrir o painel.
     * @example 
     * browser.filtrosAvancados("Localizador", true)
     * @author Cássio
    */
    command: function (btnFiltro, abrir = "true") {
        if (btnFiltro == "" || btnFiltro == null || btnFiltro == undefined) {
            this.assert.fail("O parâmetro 'btnFiltro' não foi informado")
            return this;
        }

        if (abrir == "" || abrir == null || abrir == undefined) {
            this.assert.fail("O parâmetro 'abrir' não foi informado")
            return this;
        }


        if (util._isXpath(btnFiltro)) {
            this
                .waitForElementPresent('xpath', btnFiltro, "O botão filtros avançados não foi encontrado na tela")
                .getAttribute('xpath', btnFiltro, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    let filtro = "fieldset[id='" + str + "']";

                    if (abrir) {
                        this.getAttribute('css selector', filtro, 'aria-expanded', function (result) {
                            if (result.value == 'false') {
                                this
                                    .click('css selector', filtro)
                                    .expect.element(filtro, 'css selector').to.have.attribute("aria-expanded").which.contains("true").before(5000)
                            }
                        })

                    } else {
                        this.getAttribute('css selector', filtro, 'aria-expanded', function (result) {
                            if (result.value == 'true') {
                                this
                                    .click('css selector', filtro)
                                    .expect.element(filtro, 'css selector').to.have.attribute("aria-expanded").which.contains("false").before(5000)
                            }
                        })
                    }
                })
        } else {
            this
                .waitForElementPresent('css selector', btnFiltro, "O botão filtros avançados não foi encontrado na tela")
                .getAttribute('css selector', btnFiltro, 'id', function (result) {
                    let str = util.aplicaRegexString(result.value, /.*\d+(?=\-)?/g);
                    console.log("result: " + result.value)
                    console.log("str: " + str)
                    let filtro = "fieldset[id='" + str + "']";
                    console.log("Esse é o filtro: " + filtro)

                    if (abrir) {
                        this.getAttribute('css selector', filtro, 'aria-expanded', function (booleanAbrir) {
                            if (booleanAbrir.value == 'false') {
                                this
                                    .click('css selector', filtro)
                                    .expect.element(filtro, 'css selector').to.have.attribute("aria-expanded").which.contains("true").before(5000)
                            }
                        })

                    } else {
                        this.getAttribute('css selector', filtro, 'aria-expanded', function (booleanAbrir) {
                            if (booleanAbrir.value == 'true') {
                                this
                                    .click('css selector', filtro)
                                    .expect.element(filtro, 'css selector').to.have.attribute("aria-expanded").which.contains("false").before(5000)
                            }
                        })
                    }
                })
        }

        return this;
    },
};