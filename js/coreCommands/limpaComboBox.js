// @ts-nocheck
module.exports = {
    /**
     * @function limpaComboBox
     * @category Core Commands
     * @module
     * @description - Injeta um código javascript no browser que força um campo do tipo combobox a ficar vazio.
     * Essa função também poderia ser utilizada com outros campos que não sejam combobox, porém isso não foi testado e pode não funcionar.
     * @param {String} campo - Localizador **Css** do campo combobox que deve ser limpo
     * Observação: Essa função requer que o localizador do campo seja um Css,
     * pois ela utiliza métodos próprio de javascript que só funcionam com Css.
     * @example browser.limpaComboBox("input[data-test-id='Combo']")
     * @author Cássio
    */
    command: function (campo) {
        this.waitForElementVisible(campo)
            .execute(
                function (campo) {
                    const field = document.querySelector(campo);
                    field.value = null;
                },
                [campo]
            );

        return this;
    },
};