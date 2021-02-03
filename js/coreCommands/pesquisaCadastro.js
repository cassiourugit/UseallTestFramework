// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function pesquisaCadastro
     * @category Core commands
     * @module
     * @description - Efetua a busca em um campo de pesquisa de um cadastro ou processo e aguarda até que a listagem termine a busca.
     * Observação: Essa função não valida se a informação foi encontrada corretamente, ela apenas efetua a busca e espera a listagem carregar. 
     * @param {string} campoPesquisar - Localizador **Css** ou **Xpath** do campo de busca
     * @param {string} btnPesquisar - Localizador **Css** ou **Xpath** do botão que efetua a busca
     * @param {string} texto - Texto para ser inserido no campo de busca
     * @param {boolean} [slowText = false] - ***Opcional*** Se informado como true, o texto será inserido com uma digitação lenta, simulando um usuário. Isso pode ser necessário em campos que precisam de um tempo até disparar o bind.
     * @example 
     * browser.pesquisaCadastro("input[data-test-id='Pesquisar']", "buttom[data-test-id='btnPesquisar']", "Cadastro que eu quero buscar")
     * @author Cássio
    */
    command: function (campoPesquisar, btnPesquisar, texto, slowText = false) {
        if (!campoPesquisar) {
            this.assert.fail("O parâmetro 'campoPesquisar' não foi informado")
            return this;
        }

        if (!btnPesquisar) {
            this.assert.fail("O parâmetro 'btnPesquisar' não foi informado")
            return this;
        }

        if (!texto) {
            this.assert.fail("O parâmetro 'texto' não foi informado")
            return this;
        }


        if (util._isXpath(campoPesquisar)) {
            this.useXpath()
                .waitForElementVisible('xpath', campoPesquisar)
                .click(campoPesquisar)
                .clearValue(campoPesquisar)
            if (slowText) {
                this.slowText(campoPesquisar, texto)
            } else {
                this.setValue(campoPesquisar, texto)
            }
            this.useCss();
        } else {
            this.useCss()
                .waitForElementVisible(campoPesquisar)
                .click(campoPesquisar)
                .clearValue(campoPesquisar)
            if (slowText) {
                this.slowText(campoPesquisar, texto)
            } else {
                this.setValue(campoPesquisar, texto)
            }
        }

        if (util._isXpath(btnPesquisar)) {
            this.useXpath()
            this.keys(this.Keys.TAB)
                .click(btnPesquisar)
                .useCss();
        } else {
            this.useCss()
            this.keys(this.Keys.TAB)
                .click(btnPesquisar);
        }

        this.aguardaListagem();

        return this;
    },
};