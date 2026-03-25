import { defineEventHandler, getQuery, createError } from 'h3'
import * as cheerio from 'cheerio'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = query.q as string | undefined
  const page = query.page ? Number(query.page) : 1

  if (!q) {
    return { message: "Query-nya mana uy" }
  }

  try {
    const url = `https://jagokata.com/kata-bijak/kata-${q.replace(/\s/g, '+')}.html?page=${page}`
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)

    const listKata: Array<{
      q: string
      nama: string
      keterangan: string
      sumber: string
    }> = []

    const a = $('body').find('.paginate > strong').last().text()
    const numA = Number(a)
    const last = numA % 10 === 0 ? numA / 10 : (numA - (numA % 10)) / 10 + 1

    $('body').find('#citatenrijen > li').each(function () {
      const kata = $(this).find('q').first().text()
      const nama = $(this).find('.citatenlijst-auteur > a').text()
      const keterangan = $(this).find('.citatenlijst-auteur > .auteur-beschrijving').text()
      const sumber = $(this).find('.bron-citaat').text().trim()

      if (kata !== '') {
        listKata.push({ q: kata, nama, keterangan, sumber })
      }
    })

    return {
      lastPaginate: last,
      result: listKata.length > 0
        ? [listKata[Math.floor(Math.random() * listKata.length)]]
        : [],
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching data',
      data: { error: String(error) },
    })
  }
})
