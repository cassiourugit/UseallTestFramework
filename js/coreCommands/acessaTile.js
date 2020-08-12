// @ts-nocheck

module.exports = {
    /**
     * @function acessaTile
     * @category Core commands
     * @module
     * @description - Abre um cadastro ou processo pelas tiles dentros dos menus do sistema
     * @param {String} nomeDaTile - Nome da tile
     * @example browser.acessaTile("Descrição de cargos")
     * @author Cássio
    */
    command: function (nomeDaTile) {
        if (!nomeDaTile) {
            this.assert.fail("O parâmetro 'nomeDaTile' não foi informado")
            return this;
        }

        this.useXpath()
            .moveToElement("//div[@id='mainCenter-body'] //label[text()= '" + nomeDaTile + "']")
            .pause(300)
            .click("//div[@id='mainCenter-body'] //label[text()= '" + nomeDaTile + "']")
            .useCss();
    },
};