// @ts-nocheck
module.exports = {
    /**
     * @function acessarPagina
     * @category Core commands
     * @module
     * @description - Limpa os cookies e acessa uma nova página através da URL passada por parâmetro
     * @param {String} linkUrl - URL de acesso a página
     * @example browser.acessarPagina("https://useall.useallcloud.com.br/")
     * @author Cássio
    */
    command: function (linkUrl) {
        if (linkUrl == "" || linkUrl == null || linkUrl == undefined) {
            this.assert.fail("O parâmetro 'linkUrl' não foi informado")
            return this;
        }

        this.deleteCookies()
            .url(linkUrl);

        return this;
    },
};