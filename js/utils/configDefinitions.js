let config;

const destacaElemento = false;
const delaySlowText = 50;

try {
    config = require("../../usealltestframework.conf")
}
catch (e) {
    console.log('Não foi encontrado o arquivo de configuração "usealltestfraework.conf.js na raiz do projeto."')
    console.log('Setando as configurações padrão:')
    console.log('-> destacaElemento: ' + destacaElemento)
    console.log('-> slowText: ' + delaySlowText)
}

module.exports = {
    deveDestacarElemento: function () {
        if (!config) return false;

        return config.destaca_elemento;
    },
    tempoIntervaloDigitacao: function () {
        if (!config) return 50;

        return config.delay_text;
    },
};