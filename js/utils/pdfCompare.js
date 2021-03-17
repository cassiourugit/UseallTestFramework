const fs = require('fs');
const util = require("./util");
const pdf2img = require('pdf2img');
const BlinkDiff = require('blink-diff');
const path = require('path');
let info = {
    nomePDF: null,
    nomeDecoded: null,
    pageCount: null,
    id: new Date().valueOf().toString(36) + Math.random().toString(36).substr(2),
    paginas: new Array(),
    imageDiffPath: new Array(),
};

// @ts-nocheck
module.exports = {

    /**
     * @function aguardaArquivoNoDisco
     * @category Pdf Compare
     * @module
     * @description - Aguarda o arquivo aparecer no caminho informado
     * @param {String} filePath - Diretório onde o arquivo deve estar salvo
     * @param {Number} timeout - Tempo máximo em ms para esperar o arquivo aparecer
     * @example 
     * pdfCompare.aguardaArquivoNoDisco("C:/temp", 10000);
     * @author Cássio
    */
    aguardaArquivoNoDisco: function (filePath, timeout) {
        return new Promise(function (resolve, reject) {

            if (!filePath) {
                reject(new Error('A variável filePath não está definida.'));
                return;
            }

            if (!timeout) {
                timeout = 30000;
            }

            if (!info.nomePDF) {
                reject(new Error('A variável nomePDF não está definida.'));
                return;
            }

            if (!info.nomeDecoded) {
                reject(new Error('A variável nomeDecoded não está definida.'));
                return;
            }


            let caminho = filePath + "\\" + info.nomePDF + ".pdf";

            const timer = setTimeout(function () {
                watcher.close();
                console.log(info.nomePDF)
                console.log(info.nomeDecoded)
                reject(new Error('Arquivo não existe e não foi criado durante o tempo limite'));
            }, timeout);

            fs.access(caminho, fs.constants.R_OK, function (err) {
                if (!err) {
                    clearTimeout(timer);
                    watcher.close();
                    resolve();
                }
            });

            var dir = path.dirname(caminho);
            var basename = path.basename(caminho);
            var watcher = fs.watch(dir, function (eventType, filename) {
                if (eventType === 'rename' && filename === basename) {
                    clearTimeout(timer);
                    watcher.close();
                    resolve();
                }
            });
        }).then(() => {
            fs.rename(filePath + "\\" + info.nomePDF + ".pdf", filePath + "\\" + info.nomeDecoded + ".pdf", function (err) {
                if (err) {
                    console.log('Não foi possível renomear o arquivo.');
                    throw err;
                }
            });
        });
    },

    /**
     * @function convertPDFToImage
     * @category Pdf Compare
     * @module
     * @description - Converte um arquivo PDF em imagem
     * Observação! Essa função utiliza o pacote pdf-image, e para este pacote funcionar é necessário instalar no computador duas ferramentas adicionais:
     * GosthScript https://www.ghostscript.com/download/gsdnld.html
     * GraphicsMagick http://www.graphicsmagick.org/download.html
     * A ferramenta GraphicsMagick precisa ter sua variável de ambiente adicionado no PATH das variáveis de sistema
     * Somente após a instação correta dessas duas ferramentas, a conversão de pdf para imagem irá funcionar.
     * @param {String} filePath - Diretório onde o PDF está localizado
     * @param {String} fileName - Nome do arquivo PDF sem a extensão
     * @example 
     * pdfCompare.convertPDFToImage("C:/temp", "espelhoPlanoDeAcao");
     * @author Cássio
    */
    convertPDFToImage: function (filePath) {
        return new Promise(function (resolve, reject) {

            if (!filePath) {
                reject(new Error('A variável path não está definida.'));
                return;
            }

            if (!info.nomeDecoded) {
                reject(new Error('A variável nomeDecoded não está definida.'));
                return;
            }

            let caminho = filePath + "\\" + info.nomeDecoded + ".pdf";

            //Pega número de páginas do PDF para informar ao comparador posteriormente
            const cmd = 'pdfinfo ' + caminho + '|find "Pages:"';
            const execSync = require('child_process').execSync;
            info.pageCount = execSync(cmd).toString().match(/\d+/)[0];

            //Configurações da conversão
            pdf2img.setOptions({
                type: 'png',                                // png or jpg, default jpg
                size: 1920,                                 // default 1024
                density: 300,                               // default 600
                outputdir: filePath,                        // output folder, default null (if null given, then it will create folder name same as file name)
                outputname: null,                           // output file name, dafault null (if null given, then it will create image name same as input name)
                page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                quality: 100                                // jpg compression quality, default: 100
            });

            //Converte os arquivos
            pdf2img.convert(caminho, function (err) {
                if (err) console.log(err)
                else resolve();
            });
        });
    },

    /**
     * @function comparaImagens
     * @category Pdf Compare
     * @module
     * @description - Compara a imagem extraída do PDF com o modelo armazenado e armazena uma imagem destacando as diferenças caso elas existam
     * @param {String} pathOriginal - Diretório da imagem modelo para comparação
     * @param {String} pathCompare - Diretório da imagem extraída do PDF para comparação
     * @param {String} pathDiff - Diretório onde a imagem contendo as diferenças será salva
     * @param {Object} [block = null] - *** Opcional *** - Objeto contendo números das cordenadas x, y, width, height
     * @example 
     * pdfCompare.comparaImagens("C:/temp/original", "C:/temp/compare", "C:/temp/diff", "espelhoPlanoDeAcao", "testeEspelhoPlanoDeAcao", "XXXNNN");
     * @author Cássio
    */
    comparaImagens: function (pathOriginal, pathCompare, pathDiff, block = null) {
        return new Promise(async function (resolve, reject) {

            let blockOut = block;

            if (!pathOriginal) {
                reject(new Error('A variável path não está definida.'));
                return;
            }

            if (!pathCompare) {
                reject(new Error('A variável fileName não está definida.'));
                return;
            }

            if (!pathDiff) {
                reject(new Error('A variável pathDiff não está definida.'));
                return;
            }

            if (!info.nomeDecoded) {
                reject(new Error('A variável nomeDecoded não está definida.'));
                return;
            }

            if (!info.id) {
                reject(new Error('A variável id não está definida.'));
                return;
            }

            if (!info.pageCount) {
                reject(new Error('A variável pageCount não está definida.'));
                return;
            }

            if (block == null) {
                blockOut = [
                    {
                        x: 1,
                        y: 1,
                        width: 1,
                        height: 1
                    },
                ]
            }

            for (let i = 0; i < info.pageCount; i++) {
                await initiateCompare(pathOriginal, pathCompare, pathDiff, i, blockOut);
                if (info.paginas[i].code != 5) {
                    info.imageDiffPath[i] = "./reports\\Diff" + "\\" + info.nomeDecoded + "_pg" + (i + 1) + "-" + info.id + ".png";
                }
            }
            resolve(info);
        });
    },

    /**
     * @function comparaImagensBoleto
     * @category Pdf Compare
     * @module
     * @description - Compara a imagem extraída do PDF com o modelo armazenado e armazena uma imagem destacando as diferenças caso elas existam
     * @param {String} pathOriginal - Diretório da imagem modelo para comparação
     * @param {String} pathCompare - Diretório da imagem extraída do PDF para comparação
     * @param {String} pathDiff - Diretório onde a imagem contendo as diferenças será salva
     * @param {Object} [block = null] - *** Opcional *** - Objeto contendo números das cordenadas x, y, width, height
     * @example 
     * pdfCompare.comparaImagensBoleto("C:/temp/original", "C:/temp/compare", "C:/temp/diff", "espelhoPlanoDeAcao", "testeEspelhoPlanoDeAcao", "XXXNNN");
     * @author Cássio
    */
    comparaImagensBoleto: function (pathOriginal, pathCompare, pathDiff, block = null) {
        return new Promise(async function (resolve, reject) {

            let blockOut = block;

            if (!pathOriginal) {
                reject(new Error('A variável path não está definida.'));
                return;
            }

            if (!pathCompare) {
                reject(new Error('A variável fileName não está definida.'));
                return;
            }

            if (!pathDiff) {
                reject(new Error('A variável pathDiff não está definida.'));
                return;
            }

            if (!info.nomeDecoded) {
                reject(new Error('A variável nomeDecoded não está definida.'));
                return;
            }

            if (!info.id) {
                reject(new Error('A variável id não está definida.'));
                return;
            }

            if (!info.pageCount) {
                reject(new Error('A variável pageCount não está definida.'));
                return;
            }

            if (block == null) {
                blockOut = [
                    {
                        x: 1,
                        y: 1,
                        width: 1,
                        height: 1
                    },
                ]
            }

            for (let i = 0; i < info.pageCount; i++) {
                await initiateCompareBoleto(pathOriginal, pathCompare, pathDiff, i, blockOut);
                if (info.paginas[i].code != 5) {
                    info.imageDiffPath[i] = "./reports\\Diff" + "\\" + info.nomeDecoded + "_pg" + (i + 1) + "-" + info.id + ".png";
                }
            }
            resolve(info);
        });
    },

    /**
     * @function recuperaNomePDF
     * @category Pdf Compare
     * @module
     * @description - Recupera o nome do arquivo PDF através da URL
     * @param {String} url - URL
     * @example 
     * pdfCompare.recuperaNomePDF("http://relatorios/espelho de ação corretiva.pdf");
     * @author Cássio
    */
    recuperaNomePDF: function (url) {
        //Recupera o nome do arquivo baixado sem a extensão
        const str = url.substring(
            url.lastIndexOf("/") + 1,
            url.lastIndexOf(".")
        )
        //Codifica os caracteres especiais
        info.nomePDF = decodeURI(str)

        info.nomeDecoded = util.limpaString(info.nomePDF);
    },

    /**
     * @function recuperaNomePDFBoleto
     * @category Pdf Compare
     * @module
     * @description - Recupera o nome do arquivo PDF gerado para boletos através da URL
     * @param {String} url - URL
     * @example 
     * pdfCompare.recuperaNomePDFBoleto("https://liberadauseall.useall.com.br/apiedi/api//v1/boletoimpressao/I19yHJWIwOu8");
     * @author Cássio
    */
    recuperaNomePDFBoleto: function (url) {
        //Recupera o nome do arquivo baixado sem a extensão
        const str = util.aplicaRegexString(url, /.([^\/]+$)/g)

        //Codifica os caracteres especiais
        info.nomePDF = decodeURI(str)

        info.nomeDecoded = util.limpaString(info.nomePDF);
    },
}

function initiateCompare(pathOriginal, pathCompare, pathDiff, pagina, block) {
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        const diff = new BlinkDiff({
            imageAPath: pathOriginal + "\\" + info.nomeDecoded + "_" + (pagina + 1) + ".png",
            imageBPath: pathCompare + "\\" + info.nomeDecoded + "_" + (pagina + 1) + ".png",

            thresholdType: BlinkDiff.THRESHOLD_PIXEL,
            threshold: 0.01,
            outputBackgroundOpacity: 0.4,
            composition: false,
            blockOut: block,
            imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
            imageOutputPath: pathDiff + "\\" + info.nomeDecoded + "_pg" + (pagina + 1) + "-" + info.id + ".png"
        });

        diff.run(function (error, result) {
            if (error) {
                reject("Ocorreu um erro durante a comparação da página: " + (pagina + 1) + " Mais detalhes: " + error)
            }
            console.log("Concluindo comparação da página: " + (pagina + 1))
            info.paginas[pagina] = result;
            resolve();
        });
    });
}

function initiateCompareBoleto(pathOriginal, pathCompare, pathDiff, pagina, block) {
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        const diff = new BlinkDiff({
            imageAPath: pathOriginal,
            imageBPath: pathCompare + "\\" + info.nomeDecoded + "_" + (pagina + 1) + ".png",

            thresholdType: BlinkDiff.THRESHOLD_PIXEL,
            threshold: 0.01,
            outputBackgroundOpacity: 0.4,
            composition: false,
            blockOut: block,
            imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
            imageOutputPath: pathDiff + "\\" + info.nomeDecoded + "_pg" + (pagina + 1) + "-" + info.id + ".png"
        });

        diff.run(function (error, result) {
            if (error) {
                reject("Ocorreu um erro durante a comparação da página: " + (pagina + 1) + " Mais detalhes: " + error)
            }
            console.log("Concluindo comparação da página: " + (pagina + 1))
            info.paginas[pagina] = result;
            resolve();
        });
    });
}