const cheerio = require('cheerio');
const request = require('request-promise');

const STATUS_ONLINE = 'imagens/bola_verde_P.png';
const STATUS_OFFLINE = 'imagens/bola_vermelho_P.png';
const STATUS_STANDBY = 'imagens/bola_amarela_P.png';

const colunasTabela = ['UF', 'Autorizacao', 'Retorno', 'Inutilizacao', 'ConsultaProt', 'Status',
    'Tempo', 'ConsultaCad', 'Recepcao'];

module.exports = {
    async index(req, res) {
        const urlSefaz = 'http://www.nfe.fazenda.gov.br/portal/disponibilidade.aspx?versao=0.00&tipoConteudo=Skeuqr8PQBY=';
        let status = [];

        try {
            const $ = await request({
                uri: urlSefaz,
                transform: body => cheerio.load(body)
            });

            const tabela = $('#ctl00_ContentPlaceHolder1_gdvDisponibilidade2').find('tbody tr');
            $(tabela).each((i, el) => {
                if (i == 0) return;
                let dados = {};
                $(el).children('td').each((index, td) => {
                    let value = '';

                    const img = $(td).find('img');

                    const src = $(img).attr('src');
                    if (src) {
                        switch (src) {
                            case STATUS_ONLINE:
                                value = 'on';
                                break;
                            case STATUS_OFFLINE:
                                value = 'off';
                                break;
                            default: value = 'pedding';
                        }
                    } else {
                        value = $(td).text();
                    }

                    dados[colunasTabela[index]] = value;
                });

                status.push(dados);
            })
        } catch (error) {
            res.status(200).json({ error: true, message: error.message, status });
        }
        res.status(200).json({ error: false, message: '', status });
    }
}