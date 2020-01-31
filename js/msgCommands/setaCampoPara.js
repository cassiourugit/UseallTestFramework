// @ts-nocheck
const loc = require("../../page_objects/useallLocators");

module.exports = {
    /**
     * @function setaCampoPara
     * @category Msg Commands
     * @module
     * @description - Seta o destinatário informado no campo Para
     * @param {String} nomeDestinatario - Nome do destinatário que deve ser setado no campo
     * @example 
     * browser.setaCampoPara("Cássio")
     * @author Cássio
    */
    command: function (nomeDestinatario) {
        this.waitForElementVisible(loc.mensageria.campoPara)
            .aguardaFoco(loc.mensageria.campoPara)
            .sendKeys(loc.mensageria.campoPara, nomeDestinatario)
            .aguardaListagem()
            .expect.elements(loc.geral.listaSearchfield).count.to.equal(1);

        this.assert.attributeContains(loc.geral.listaSearchfield, "textContent", nomeDestinatario)
            .click(loc.geral.listaSearchfield)
            .assert.attributeContains(loc.mensageria.tagCampoPara, "innerHTML", "mi-person", "O ícone encontrado na tag não é o esperado: mi-person")
            .assert.attributeContains(loc.mensageria.tagCampoPara, "textContent", nomeDestinatario, "O destinatário encontrado não é o esperado");

        this.removeListaSearchfield();

        return this;
    }
};