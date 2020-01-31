// @ts-nocheck
module.exports = {
    /**
     * @function validaCorMenuAtivo
     * @category Core Commands
     * @module
     * @description - Verifica se o ícone do menu está setado como ativo e com a cor correta após ter sido aberto
     * @param {string} nomeDoMenu - Nome do menu
     * @example 
     * browser.validaCorMenuAtivo("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDoMenu) {
        this.useXpath()
            .verify.cssProperty("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", "color", "rgba(36, 152, 219, 1)", "O ícone do menu não está com a cor esperada para menus ativos.")
            .useCss();

        return this;
    },
};