// @ts-nocheck
const util = require("../page_objects/util");
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
        this.waitForElementVisible(util.documentos.campoPesquisar)
            .setValue(util.documentos.campoPesquisar, texto)
            .click(util.documentos.campoPesquisar)
            .click(util.documentos.btnPesquisar)
            .aguardaListagem()
            .assert.attributeContains(util.documentos.colunaNome, "textContent", texto)

        return this;
    },
};