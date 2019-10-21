// @ts-nocheck
module.exports = {
    /**
     * @function acessarPagina
     * @category Commands
     * @class
     * @description - Limpa os cookies e acessa uma nova página através da URL passada por parâmetro
     * @param {String} linkUrl - URL de acesso a página
     * @example browser.acessarPagina("https://useall.useallcloud.com.br/")
     * @author Cássio
    */
    command: function (linkUrl) {
        this.deleteCookies()
            .url(linkUrl);

        return this;
    },
};