// @ts-nocheck
module.exports = {
    /**
     * @function rodaArquivo
     * @category Core Commands
     * @module
     * @description - Roda um arquivo executável
     * Pode ser utilizado para rodar qualquer arquivo necessário para o teste.
     * Por exemplo fazer o upload de um arquivo. Quando o windows abre a janela de seleção de arquivo,
     * o navegador não tem acesso a essa janela, e com isso o teste automatizado não pode interagir com ela.
     * Para isso pode-se utilizar um executável que seleciona o arquivo.
     * @param {string} nomeDoExecutavel - Nome do arquivo executável (incluindo a extensão)
     * @param {string} caminhoDoExecutavel - Caminho completo onde o executável está localizado
     * @example 
     * browser.rodaArquivo("executavel.exe", "c:/temp")
     * @author Cássio
    */
    command: function (nomeDoExecutavel, caminhoDoExecutavel) {
        var exec = require('child_process').execFile;

        exec(nomeDoExecutavel, { cwd: caminhoDoExecutavel }, function (err, data) {
            console.log(err)
            console.log(data.toString());
        });
    },
};