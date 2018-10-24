// Importer
const promises = require('request-promise')
const cheerio = require('cheerio')

// Request console
let fromList = [{bangkok : []}]

const seeDetailOf = ref => {
  return 'something'
}
const scrapList = (loadble, stock) => {
    const list = loadble('div.page-block div.block-card ul.text-columns-2 a')
  list.map((index, item) => {
    try {
      const destinations = {
        goal : item.attribs.href.replace('/en/travel/bangkok/',"") ,
        href : `https://12go.asia${item.attribs.href}`
      }
      stock = [...stock, destinations]
    } catch (err) {}
  })
  return stock
}

// Producer
fromList.map(startFrom => {
  const pageStock = []
  const URL = `https://12go.asia/en/travel/${Object.keys(startFrom)}`
  const options = {
  uri: URL,
  transform: body => scrapList(cheerio.load(body), pageStock)
  }
  //
  promises(options)
  .then(res => {
    startFrom.bangkok = res
    return  startFrom
  })
  .then(res => {
    console.log(fromList,res)
  })
})
  

