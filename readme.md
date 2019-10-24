Métodos para automação de testes dos sistemas Useall

## Pré-requisitos
* Nightwatch
* NodeJs
&nbsp;

Se você já tem um projeto de testes automatizado utilizando nightwatch, você já atende aos requisitos necessários para utilizar esse framework.

## Como instalar
Digite na linha de comando:

```
npm install usealltestframework
```

## Como configurar
Você deve inserir a seguinte linha dentro do "module.exports" no seu arquivo "nightwatch.conf.js"

```
    custom_commands_path: [
        "node_modules/usealltestframework/js/commands",
    ],

```

## Como utilizar as funções
Após a instalação e configuração do framework, para utilizar as funções basta chamá-las a partir do comando "browser" ou "client", como se fossem funções do próprio Nightwatch.
&nbsp;

Veja o exemplo abaixo, onde será chamada a função que vai buscar o "João da Silva" em um campo de busca qualquer:

```
browser.setaSearchfield("localizadorDoCampo", "João da Silva")
```


## Utils
Esse framework também traz algumas funções que podem facilitar a criação de alguns testes. Existem funções geradoras de CPF e CNPJ, geradores de data com diversos formatos, geradoras de strings randomicas com determinados números de caracteres, entre outras.

Para utilizar esse recurso, basta seguir o exemplo abaixo no seu arquivo de teste

```
const util = require("usealltestframework/js/utils/util");
```
A linha acima instancia o pacote de funções no arquivo de teste. Agora, basta utilizar as funções dessa forma:

```
var cpf = util.geraCpf();
var data = util.getData();
var stringCom4000Caracteres = util.geraString(4000);
```
&nbsp;

Você pode conferir todas as funções disponíveis no menu "Utils".


## Construído com:
* [Nighwatch](https://nightwatchjs.org/) - Framework de automação de testes
* [Npm](https://www.npmjs.com/) - Gerênciador de pacotes javascript
* [Np](https://github.com/sindresorhus/np#readme) - Ferramenta para controlar o versionamento e a publicação de pacotes npm
* [JSDocs](https://jsdoc.app/) - Ferramenta de documentação
* [Better-Docs](https://github.com/SoftwareBrothers/better-docs) - Plugin para personalizar documentações do JSDocs

## Author
**Cássio Benincá**
