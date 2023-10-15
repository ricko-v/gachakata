const app = require('express')();
const request = require("request");
const co = require("cheerio");

app.set('json spaces', 2);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api/gacha', (req, res) => {
  let q = req.query.q;
  let n = req.query.page ? Number(req.query.page) : 1;
  let listKata = [];

  if (!q) {
    res.json({
      message: "Query-nya mana uy"
    });
  } else {
    request(`https://jagokata.com/kata-bijak/kata-${q.replace(/[' ']/g, '+')}.html?page=${n}`, (e, re, b) => {
      if (e) res.json({
        message: "Error uy",
        s: JSON.stringify(e)
      });
      let $ = co.load(b);
      let paginate = $('body').find('.paginate').text();
      let a = $('body').find('.paginate > strong').last().text();
      let last = Number(a) % 10 == 0 ? Number(a) / 10 : (Number(a) - (Number(a) % 10)) / 10 + 1

      $('body').find("#citatenrijen > li").each(function () {
        let kata = $(this).find('q').first().text();
        let nama = $(this).find('.citatenlijst-auteur > a').text();
        let keterangan = $(this).find('.citatenlijst-auteur > .auteur-beschrijving').text();
        let sumber = $(this).find('.bron-citaat').text().trim();

        if (kata !== '') {
          listKata.push({
            q: kata,
            nama: nama,
            keterangan: keterangan,
            sumber: sumber
          })
        }
      });

      res.json({
        lastPaginate: last,
        result: [listKata[Math.floor(Math.random() * (listKata.length - 1))]]
      });
    });

  }
});

module.exports = app;
