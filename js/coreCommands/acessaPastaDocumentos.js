// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function acessaPastaDocumentos
     * @category Core commands
     * @module
     * @description - Pesquisa e acessa uma pasta do módulo Documentos
     * @param {String} texto - Nome da pasta
     * @example browser.acessaPastaDocumentos("Pasta")
     * @author Cássio
    */
    command: function (texto) {
        if (texto == "" || texto == null || texto == undefined) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }

        this.pesquisaDocumentos(texto)
            .click(loc.documentos.colunaIcon)
            .aguardaListagem();

        return this;
    },
};