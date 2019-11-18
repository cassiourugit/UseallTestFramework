// @ts-nocheck
module.exports = {
    /**
     * @function validaRegistroInativo
     * @category Commands
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
        this.execute(function (celula) {
            // @ts-ignore
            return document.querySelector(celula).parentNode.getAttribute("class");
        }, [celula], function (result) {
            this.assert.equal(result.value, "use-inactive-row   x-grid-row");
        });

        return this;
    },
};