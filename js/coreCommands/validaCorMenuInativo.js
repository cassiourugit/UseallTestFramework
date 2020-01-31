// @ts-nocheck
module.exports = {
    /**
     * @function validaCorMenuInativo
     * @category Core Commands
     * @module
     * @description - Verifica se o ícone do menu está setado como inativo e com a cor correta após ter sido fechado
     * @param {string} nomeDoMenu - Nome do menu
     * @example 
     * browser.validaCorMenuInativo("Plano de ação")
     * @author Cássio
    */
    command: function (nomeDoMenu) {
        this.useXpath()
            .verify.cssProperty("//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='" + nomeDoMenu + "']", "color", "rgba(164, 164, 164, 1)", "O ícone do menu não está com a cor esperada para menus inativos.")
            .useCss();

        return this;
    },
};