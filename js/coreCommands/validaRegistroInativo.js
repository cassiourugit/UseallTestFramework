// @ts-nocheck
module.exports = {
    /**
     * @function validaRegistroInativo
     * @category Core commands
     * @module
     * @description - Verifica se a célula da grid está em uma linha inativa
     * @param {string} celula - Localizador **Css** da célula
     * Observação: Essa função requer que o localizador da célula seja um Css,
     * pois ela utiliza métodos próprio de javascript que só funcionam com Css.
     * @example 
     * browser.validaRegistroInativo(".x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)")
     * @author Cássio
    */
    command: function (celula) {
        if (celula == "" || celula == null || celula == undefined) {
            this.assert.fail("O parâmetro 'celula' não foi informado")
            return this;
        }

        this.execute(function (celula) {
            // @ts-ignore
            return document.querySelector(celula).parentNode.getAttribute("class");
        }, [celula], function (result) {
            this.assert.ok(result.value.includes("use-inactive-row"), "O registro localizado por " + celula + " não está marcado como inativo.");
        });

        return this;
    },
};