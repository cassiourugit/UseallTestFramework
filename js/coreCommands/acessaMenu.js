// @ts-nocheck
const config = require("../../usealltestframework.conf");

module.exports = {
    /**
     * @function acessaMenu
     * @category Core commands
     * @module
     * @description - Abre um módulo pelo menu do sistema
     * @param {String} nomeDoMenu - Nome do menu
     * @example browser.acessaMenu("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDoMenu) {
        if (nomeDoMenu == "" || nomeDoMenu == null || nomeDoMenu == undefined) {
            this.assert.fail("O parâmetro 'nomeDoMenu' não foi informado")
            return this;
        }

        this.useXpath()
            .moveToElement("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", 25, 25)
            .pause(300)
            .click("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']")
            .waitForElementPresent("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']/parent::div[contains(@class, 'active')]")
            .getCssProperty("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", "color", function (result) {
                if (result.value != "rgba(36, 152, 219, 1)") {
                    if (config.destaca_elemento) {
                        this.destacaElemento("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']")
                        this.assert.cssProperty("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", "color", "rgba(36, 152, 219, 1)", "O menu deveria ser destacado com a cor: rgba(36, 152, 219, 1), porém apresentou a cor: " + result.value)
                            .useCss();

                        return this;
                    }
                    this.assert.cssProperty("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", "color", "rgba(36, 152, 219, 1)", "O menu deveria ser destacado com a cor: rgba(36, 152, 219, 1), porém apresentou a cor: " + result.value)
                        .useCss();

                    return this;
                }
            })
            .useCss();
    },
};