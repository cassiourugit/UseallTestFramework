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

        this.waitForElementVisible(loc.login.campoUsuario)
            .clearValue(loc.login.campoUsuario)
            .sendKeys(loc.login.campoUsuario, usuario)
            .waitForElementVisible(loc.login.campoSenha)
            .clearValue(loc.login.campoSenha)
            .sendKeys(loc.login.campoSenha, senha);

        if (esquemaBanco != null) {
            this.waitForElementVisible(loc.login.campoBanco)
                .click(loc.login.campoBanco)
                .waitForElementVisible("option[value= '" + esquemaBanco + "']")
                .click("option[value= '" + esquemaBanco + "']");
        }

        this.waitForElementVisible(loc.login.btnLogar)
            .click(loc.login.btnLogar);

        if (elementoDeEspera != null) {
            if (util._isXpath(elementoDeEspera)) {
                this.useXpath()
                    .waitForElementVisible(elementoDeEspera, 30000)
                    .useCss();
            } else {
                this.waitForElementVisible(elementoDeEspera, 30000)
            }
        } else {
            this.waitForElementVisible(loc.geral.fotoUsuario, 30000);
        }

        return this;
    },

};