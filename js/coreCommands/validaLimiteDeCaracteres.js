// @ts-nocheck
const util = require("../utils/util");
let stringMaisUm;
let string;

module.exports = {
    /**
     * @function validaLimiteDeCaracteres
     * @category Core commands
     * @module
     * @description - Verifica se o campo possui o limite de caracteres informado
     * @param {string} campo - Localizador **Css** do campo
     * Observação: Essa função requer que o localizador do campo seja um Css,
     * pois ela utiliza métodos próprio de javascript que só funcionam com Css.
     * @param {number} limiteDeCaracteres - Número máximo de caracteres que o campo deveria aceitar
     * @param {Boolean} [numberField = false] - **Opcional** Se setado como "true" a string será gerada usando apenas números.
     * @example 
     * browser.validaLimiteDeCaracteres("input[data-test-id='campo']", 100)
     * @author Cássio
    */
    command: function (campo, limiteDeCaracteres, numberField = false) {

        if (campo == "" || campo == null || campo == undefined) {
            this.assert.fail("O parâmetro 'campo' não foi informado")
            return this;
        }

        if (limiteDeCaracteres == "" || limiteDeCaracteres == null || limiteDeCaracteres == undefined) {
            this.assert.fail("O parâmetro 'limiteDeCaracteres' não foi informado")
            return this;
        }

        if (numberField) {
            stringMaisUm = util.geraString(limiteDeCaracteres + 1, true);
            string = util.geraString(limiteDeCaracteres, true);
        } else {
            stringMaisUm = util.geraString(limiteDeCaracteres + 1);
            string = util.geraString(limiteDeCaracteres);
        }

        //Preenche com o limite do campo e mais um
        this.execute(
            function (campo, stringMaisUm) {
                const field = document.querySelector(campo);
                field.value = stringMaisUm;
            }, [campo, stringMaisUm]);
        this.click(campo)
        this.keys(this.Keys.TAB);
        this.assert.attributeContains(campo, "aria-invalid", "true")
            .assert.attributeContains(campo, "data-errorqtip", "O tamanho máximo para este campo é " + limiteDeCaracteres, "O campo " + campo + " não possui o limite de caracteres previsto.")
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