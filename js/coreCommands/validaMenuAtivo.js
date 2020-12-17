// @ts-nocheck
module.exports = {
    /**
     * @function validaMenuAtivo
     * @category Core commands
     * @module
     * @description - Verifica se o ícone do menu está setado como ativo e com a cor correta após ter sido aberto
     * @param {string} nomeDoMenu - Nome do menu
     * @example 
     * browser.validaMenuAtivo("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDoMenu) {
        if (nomeDoMenu == "" || nomeDoMenu == null || nomeDoMenu == undefined) {
            this.assert.fail("O parâmetro 'nomeDoMenu' não foi informado")
            return this;
        }

        this.useXpath()
            .verify.cssProperty("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", "color", "rgba(36, 152, 219, 1)", "O ícone do menu não foi ativado.")
            .useCss();

        return this;
    },
};