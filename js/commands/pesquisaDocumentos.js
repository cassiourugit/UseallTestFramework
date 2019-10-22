// @ts-nocheck
const loc = require("../locators");
/**
 * @function pesquisaDocumentos
 * @category Commands
 * @class
 * @description - Efetua a busca de um documento ou pasta na listagem de documentos, e valida se a primeira linha da listagem de fato mostra o registro buscado
 * @param {string} texto - Texto com o nome do documento ou pasta a ser buscado
 * @example 
 * browser.pesquisaDocumentos("Manual Doo")
 * @author Cássio
*/
module.exports = {
    command: function (texto) {
        this.waitForElementVisible(loc.documentos.campoPesquisar)
            .setValue(loc.documentos.campoPesquisar, texto)
            .click(loc.documentos.campoPesquisar)
            .click(loc.documentos.btnPesquisar)
            .aguardaListagem()
            .assert.attributeContains(loc.documentos.colunaNome, "textContent", texto)

        return this;
    },
};