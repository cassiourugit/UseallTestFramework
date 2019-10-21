// @ts-nocheck
const util = require("../page_objects/util");

module.exports = {
    /**
     * @function pesquisaCadastro
     * @category Commands
     * @class
     * @description - Efetua a busca em um campo de pesquisa de um cadastro ou processo e aguarda até que a listagem termine a busca.
     * Observação: Essa função não valida se a informação foi encontrada corretamente, ela apenas efetua a busca e espera a listagem carregar. 
     * @param {string} campoPesquisar - Localizador **Css** ou **Xpath** do campo de busca
     * @param {string} btnPesquisar - Localizador **Css** ou **Xpath** do botão que efetua a busca
     * @param {string} texto - Texto para ser inserido no campo de busca
     * @example 
     * browser.pesquisaCadastro("input[data-test-id='Pesquisar']", "buttom[data-test-id='btnPesquisar']", "Cadastro que eu quero buscar")
     * @author Cássio
    */
    command: function (campoPesquisar, btnPesquisar, texto) {
        if (util._isXpath(campoPesquisar)) {
            this.useXpath()
                .waitForElementVisible(campoPesquisar)
                .clearValue(campoPesquisar)
                .sendKeys(campoPesquisar, texto)
                .useCss();
        } else {
            this.waitForElementVisible(campoPesquisar)
                .clearValue(campoPesquisar)
                .sendKeys(campoPesquisar, texto);
        }

        if (util._isXpath(btnPesquisar)) {
            this.useXpath()
                .click(btnPesquisar)
                .useCss();
        } else {
            this.click(btnPesquisar);
        }

        this.aguardaListagem();

        return this;
    },
};