// @ts-nocheck
const loc = require("../commumLocators");
const config = require("../utils/configDefinitions")
/**
 * @function pesquisaDocumentos
 * @category Core commands
 * @module
 * @description - Efetua a busca de um documento ou pasta na listagem de documentos, e valida se a primeira linha da listagem de fato mostra o registro buscado
 * @param {string} texto - Texto com o nome do documento ou pasta a ser buscado
 * @example 
 * browser.pesquisaDocumentos("Manual Doo")
 * @author Cássio
*/
module.exports = {
    command: function (texto) {
        if (texto == "" || texto == null || texto == undefined) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }

        this.useCss()
            .waitForElementVisible(loc.documentos.campoPesquisar)
            .setValue(loc.documentos.campoPesquisar, texto)
            .click(loc.documentos.campoPesquisar)
            .click(loc.documentos.btnPesquisar)
            .aguardaListagem()
            .validaListagemVazia(loc.documentos.listagem)
            .getAttribute(loc.documentos.colunaNome, "textContent", function (result) {
                if (!result.value.includes(texto)) {
                    if (config.deveDestacarElemento) {
                        this.destacaElemento(loc.documentos.colunaNome);
                        this.assert.attributeContains(loc.documentos.colunaNome, "textContent", texto, "O documento esperado como primeiro resultado da busca era: " + texto + ", porém a busca retornou o registro: " + result.value);

                        return this;
                    }
                    this.assert.attributeContains(loc.documentos.colunaNome, "textContent", texto, "O documento esperado como primeiro resultado da busca era: " + texto + ", porém a busca retornou o registro: " + result.value);

                    return this;
                }
            })
    },
};