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

Você deve inserir as seguintes linhas no seu arquivo "nightwatch.conf.js"

```
.
.
.
custom_commands_path: [
        "node_modules/usealltestframework/js/commands",
        "node_modules/usealltestframework/js/page_objects",
    ],
.
.
.
```

## Como utilizar as funções

Após a instalação e configuração do framework, para utilizar basta chamar as funções a partir do comando "browser" ou "client" do próprio Nightwatch.
Veja o exemplo:

Será chamada a função que vai buscar o "João da Silva" no campo de busca de Fornecedores

```
browser.setaSearchfield("localizadorDoCampo", "João da Silva")
```


## Built With

* [Nighwatch](https://nightwatchjs.org/) - Framework de automação de testes
* [npm](https://www.npmjs.com/) - Gerênciador de pacotes javascript
* [np](https://github.com/sindresorhus/np#readme) - Ferramenta para facilitar a publicação de pacotes npm
* [JSDocs](https://jsdoc.app/) - Ferramenta de documentação
* [Better-Docs](https://github.com/SoftwareBrothers/better-docs) - Plugin para personalizar documentações do JSDocs

## Author

* **Cássio Benincá**
