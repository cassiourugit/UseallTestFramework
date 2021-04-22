// @ts-nocheck
const util = require("../utils/util");

module.exports = {
    /**
     * @function uploadArquivo
     * @category Core commands
     * @module
     * @description - Digita o valor passapor parâmetro no campo de texto
     * @param {string} campoDoTipoFile - Localizador **Css** ou **Xpath** do campo de input que seja do tipo "file"
     * Observação, é necessário que o campo seja um input com tipo file, do contrário o arquivo não será setado no campo
     * @param {string} localDoARquivo - Local até o arquivo que deve ser enviado, incluindo a extesão do arquivo
     * @example 
     * browser.uploadArquivo("input[type='file']", "C:\\temp\\arquivo.txt")
     * @author Cássio
    */
    command: function (campoDoTipoFile, localDoARquivo) {
        if (campoDoTipoFile == "" || campoDoTipoFile == null || campoDoTipoFile == undefined) {
            this.assert.fail("O parâmetro 'campoDoTipoFile' não foi informado")
            return this;
        }

        if (localDoARquivo == "" || localDoARquivo == null || localDoARquivo == undefined) {
            this.assert.fail("O parâmetro 'localDoARquivo' não foi informado")
            return this;
        }

        if (util._isXpath(campoDoTipoFile)) {
            this.useXpath()
                .waitForElementPresent('xpath', campoDoTipoFile)
                .setValue(campoDoTipoFile, localDoARquivo)
                .useCss();
        } else {
            this.useCss()
                .waitForElementPresent('css selector', campoDoTipoFile)
                .setValue(campoDoTipoFile, localDoARquivo);
        }

        return this;
    },
};