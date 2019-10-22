// @ts-nocheck
const loc = require("../locators");

module.exports = {
    /**
     * @function removeListaSearchfield
     * @category Commands
     * @class
     * @description - Remove da página todos os elentos "li". Elementos li são carregados na página ao listar um campo de busca ou um combobox.
     * Em algumas situações o teste pode falhar na hora de encontrar elementos dentro de um campo de busca, pois podem haver elementos de outros campos abertos anteriormente carregados na página.
     * Caso seja necessário, essa função pode ser utilizada para limpar da memória do navegador esses elementos.
     * **Observação**, as funções do core que realizam buscas em searchfields ou combobox já fazem essa limpeza por padrão, não sendo necessário chamar esse comando.
     * @example 
     * browser.removeListaSearchfield()
     * @author Cássio
    */
    command: function () {
        var lista = loc.geral.listaSearchfield;

        this.execute(
            function (lista) {
                const el = document.querySelector(lista);
                el.parentElement.remove()
            },
            [lista]
        );
    },
};