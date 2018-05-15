const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('querystring');
const config = require('./config.js');

const request = 'https://mev.scba.gov.ar/MuestraCausas.asp?radio=xCa&pOrden=xCa&pOrdenAD=Asc';
const cookie = config.cookie;
const options = {
  method: 'POST',
  headers: { 'Cookie': cookie },
  url: request,
  data: {},
};
// transformResponse: [response => cheerio.load(response.data)]

const listado = [];
axios(options)
  .then((response) => {
    const $ = cheerio.load(response.data);
    $('#form1').children('.pegada').eq(1).contents().children('tr').map((i, elem) => {
      listado.push($(elem).text());
    });

    console.log(listado);
  });


