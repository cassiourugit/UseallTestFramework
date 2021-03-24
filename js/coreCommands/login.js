// @ts-nocheck
const util = require("../utils/util");
const loc = require("../commumLocators");

module.exports = {
    /**
     * @function login
     * @category Core commands
     * @module
     * @description - Faz login no sistema utilizando o usuário e senha passados por parâmetro
     * @param {string} usuario - Usuário de acesso ao sistema 
     * @param {string} senha - Senha de acesso ao sistema
     * @param {string} [esquemaBanco = null] - **Opcional** Nome do esquema do banco a ser selecionado
     * @param {string} [elementoDeEspera = null] - **Opcional** Localizador **Css** ou **Xpath** do último elemento a carregar no sistema. O teste espera esse elemento antes de prosseguir. Caso não informado, o elemento padrão é a foto do usuário no canto superior direito.
     * @example 
     * browser.url('https://app.doo.com.br')
     *        .login({usuario: "fulano", senha: "senha", esquemaBanco: "Q2NETDESENV/SRV_DESENV", elementoDeEspera: "localizador"})
     * @author Cássio
    */
    // @ts-ignore
    command: function ({ usuario, senha, esquemaBanco = null, elementoDeEspera = null }) {
        if (usuario == "" || usuario == null || usuario == undefined) {
            this.assert.fail("O parâmetro 'usuario' não foi informado")
            return this;
        }

        if (senha == "" || senha == null || senha == undefined) {
            this.assert.fail("O parâmetro 'senha' não foi informado")
            return this;
        }

        this.waitForElementVisible('css selector', loc.login.campoUsuario, 30000, "O campo usuário não foi encontrado no tempo máximo previsto")
            .clearValue(loc.login.campoUsuario)
            .setValue(loc.login.campoUsuario, usuario)
            .waitForElementVisible('css selector', loc.login.campoSenha, "O campo senha não foi encontrado no tempo máximo previsto")
            .clearValue(loc.login.campoSenha)
            .setValue(loc.login.campoSenha, senha);

        if (esquemaBanco != null) {
            this.waitForElementVisible('css selector', loc.login.campoBanco, "O campo para escolher a base não foi encontrado no tempo máximo previsto")
                .click(loc.login.campoBanco)
                .waitForElementVisible('css selector', "option[value= '" + esquemaBanco + "']", "A opção desejada não foi encontrada")
                .click("option[value= '" + esquemaBanco + "']");
        }

        this.waitForElementVisible('css selector', loc.login.btnLogar, "O botão logar não foi encontrado no tempo máximo previsto")
            .click(loc.login.btnLogar);

        if (elementoDeEspera != null) {
            if (util._isXpath(elementoDeEspera)) {
                this.useXpath()
                    .waitForElementVisible('xpath', elementoDeEspera, 30000, "O elemento de espera não apareceu após o tempo máximo previsto")
                    .useCss();
            } else {
                this.waitForElementVisible('css selector', elementoDeEspera, 30000, "O elemento de espera não apareceu após o tempo máximo previsto")
            }
        } else {
            this.waitForElementVisible('css selector', loc.geral.fotoUsuario, 30000, "O elemento de espera (foto do usuário), não apareceu no tempo máximo previsto");
        }

        return this;
    },

};