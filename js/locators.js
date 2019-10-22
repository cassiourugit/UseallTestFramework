module.exports = {
    geral: {
        campoPesquisar: 'input[data-test-id="filtro_pesquisa_geral"]',
        campoModeloRel: "input[id^='report-combo-model'][id$='inputEl']",
        btnPesquisar: 'span[data-test-id="btn_pesquisar"]',
        btnNovo: "span[data-test-id='btn_novo']",
        btnSalvar: "span[data-test-id='btn_salvar']",
        btnCancelar: "span[data-test-id='btn_cancelar']",
        btnFechar: "span[id^='use-closebutton'][id$='btnInnerEl']",
        btnEmitir: "span[id^='use-splitbutton'][id$='btnInnerEl']",
        btnEmitirArrow: "span[id^='use-splitbutton'][id$='arrowEl']",
        btnEmitirArrowEmitirX: "//span[text()='Emitir relatório']",
        btnEmitirArrowExportarX: "//span[text()='Exportar XLS']",
        btnEmitirArrowEnviarX: "//span[text()='Enviar por e-mail']",
        btnListas: "div[id^='tile-geral-listas'][id$='innerCt']",
        cabecalhoColunaCodigoX: "//div[starts-with(@id, 'gridcolumn')]//span[text()= 'Código']",
        menuRncArrowX: "//div[starts-with(@id, 'mainWest-innerCt')] //div[@data-qtip='Não conformidades']/preceding-sibling::div[@class='x-mi mi-arrow-drop-down']",
        listaSearchfield: "[id$='-picker-listWrap'] ul li",
        menuAtivoX: "//div[@class='item-menu active ']",
        toast: ".x-toast",
        toastRel: "div[id^= 'toast'][id$='innerCt']",
        loadmask: "div[aria-describedby^='loadmask']",
        loadmaskRelX: "//div[text()= 'Emitindo relatório...']",
        messageBox: "div[id^='use-messagebox'][id$='msg']",
        btnSimMessageBoxX: "//div[starts-with(@id, 'use-messagebox')] //span[contains(text(),'Sim')]",
        btnNaoMessageBoxX: "//div[starts-with(@id, 'use-messagebox')] //span[contains(text(),'Não')]",
        linkAtivo: "label[id^='use-linkativo']",
        fotoUsuario: "img[alt='Foto usuário']",
        janelaF2: "div[id^='use-pesquisageral-panel'][style*='block']",
        janelaF2Fechada: "div[id^='use-pesquisageral-panel'][style*='none']",
        campoBuscaF2: "div[id^='use-pesquisageral-panel'] input",
    },

    documentos: {
        btnPesquisar: "span[id^='use-searchbutton-'][id$='-btnIconEl']",
        campoPesquisar: "input[data-test-id='DocsFilter.PesquisaGeral']",
        colunaIcon: "div[id^='lista-documentos'] .x-grid-item:nth-child(1) .x-grid-cell:nth-child(1)",
        colunaNome: "div[id^='lista-documentos'] .x-grid-item:nth-child(1) .x-grid-cell:nth-child(2)",
    },

    login: {
        campoUsuario: "input[id='usuario']",
        campoSenha: "input[id='senha']",
        campoBanco: "select[id='banco']",
        btnLogar: "input[id='submitFormLogin']",

    }
}
