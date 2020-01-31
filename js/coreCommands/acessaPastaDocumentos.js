// @ts-nocheck
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function acessaPastaDocumentos
     * @category Core Commands
     * @module
     * @description - Pesquisa e acessa uma pasta do módulo Documentos
     * @param {String} texto - Nome da pasta
     * @example browser.acessaPastaDocumentos("Pasta")
     * @author Cássio
    */
    command: function (texto) {
        this.pesquisaDocumentos(texto)
            .click(loc.documentos.colunaIcon)
            .aguardaListagem();

        return this;
    },
};