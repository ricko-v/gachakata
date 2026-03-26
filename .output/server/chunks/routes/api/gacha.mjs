import { d as defineEventHandler, g as getQuery, c as createError } from '../../nitro/nitro.mjs';
import * as cheerio from 'cheerio';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const gacha = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const q = query.q;
  const page = query.page ? Number(query.page) : 1;
  if (!q) {
    return { message: "Query-nya mana uy" };
  }
  try {
    const url = `https://jagokata.com/kata-bijak/kata-${q.replace(/\s/g, "+")}.html?page=${page}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
      }
    });
    const body = await response.text();
    const $ = cheerio.load(body);
    const listKata = [];
    const a = $("body").find(".paginate > strong").last().text();
    const numA = Number(a);
    const last = numA % 10 === 0 ? numA / 10 : (numA - numA % 10) / 10 + 1;
    $("body").find("#citatenrijen > li").each(function() {
      const kata = $(this).find("q").first().text();
      const nama = $(this).find(".citatenlijst-auteur > a").text();
      const keterangan = $(this).find(".citatenlijst-auteur > .auteur-beschrijving").text();
      const sumber = $(this).find(".bron-citaat").text().trim();
      if (kata !== "") {
        listKata.push({ q: kata, nama, keterangan, sumber });
      }
    });
    return {
      lastPaginate: last,
      result: listKata.length > 0 ? [listKata[Math.floor(Math.random() * listKata.length)]] : []
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching data",
      data: { error: String(error) }
    });
  }
});

export { gacha as default };
//# sourceMappingURL=gacha.mjs.map
