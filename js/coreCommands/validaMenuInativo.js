// @ts-nocheck
module.exports = {
    /**
     * @function validaMenuInativo
     * @category Core commands
     * @module
     * @description - Verifica se o ícone do menu está setado como inativo e com a cor correta após ter sido fechado
     * @param {string} nomeDoMenu - Nome do menu
     * @example 
     * browser.validaMenuInativo("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDoMenu) {
        if (nomeDoMenu == "" || nomeDoMenu == null || nomeDoMenu == undefined) {
            this.assert.fail("O parâmetro 'nomeDoMenu' não foi informado")
            return this;
        }

        this.useXpath()
            .verify.cssProperty("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", "color", "rgba(164, 164, 164, 1)", "O ícone do menu não está desativado.")
            .useCss();

        return this;
    },
};