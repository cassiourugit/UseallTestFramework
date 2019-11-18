// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function validaLimiteDeCaracteres
     * @category Commands
     * @module
     * @description - Verifica se o campo possui o limite de caracteres informado
     * @param {string} campo - Localizador **Css** do campo
     * Observação: Essa função requer que o localizador do campo seja um Css,
     * pois ela utiliza métodos próprio de javascript que só funcionam com Css.
     * @param {number} limiteDeCaracteres - Número máximo de caracteres que o campo deveria aceitar
     * @example 
     * browser.validaLimiteDeCaracteres("input[data-test-id='campo']", 100)
     * @author Cássio
    */
    command: function (campo, limiteDeCaracteres) {
        var stringMaisUm = util.geraString(limiteDeCaracteres + 1);
        var string = util.geraString(limiteDeCaracteres);

        //Preenche com o limite do campo e mais um
        this.execute(
            function (campo, stringMaisUm) {
                const field = document.querySelector(campo);
                field.value = stringMaisUm;
            }, [campo, stringMaisUm]);
        this.click(campo)
        this.keys(this.Keys.TAB);
        this.assert.attributeContains(campo, "aria-invalid", "true")
            .assert.attributeContains(campo, "data-errorqtip", "O tamanho máximo para este campo é " + limiteDeCaracteres)
            .clearValue(campo);

        //Preenche com o limite exato do campo
        this.execute(
            function (campo, string) {
                const field = document.querySelector(campo);
                field.value = string;
            }, [campo, string]);
        this.click(campo)
        this.keys(this.Keys.TAB);
        this.assert.attributeContains(campo, "aria-invalid", "false");

        return this;
    },
};