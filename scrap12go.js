// Importer
const promises = require('request-promise')
const cheerio = require('cheerio')
//
let allList = [{startingPoint: 'bangkok' }]
let readList = []
//
const scrapList = (loadble, stock,startingPoint) => {
    const list = loadble('div.page-block div.block-card ul.text-columns-2 a')
  list.map((index, item) => {
    try {
      const destinations = {
        startingPoint: startingPoint ,
        endingPoint : item.attribs.href.replace('/en/travel/bangkok/',"") ,
        href : `https://12go.asia${item.attribs.href}`
      }
      stock = [...stock, destinations]
    } catch (err) {}
  })
  return stock
}
// loop1
allList.map(starting => {
  const pageStock = []
  const URL = `https://12go.asia/en/travel/${starting.startingPoint}`
  const options = {
  uri: URL,
  transform: body => scrapList(cheerio.load(body), pageStock,starting.startingPoint)
  }
  //
  promises(options)
  .then(res => {
    // console.log(res)
  })
  .then(res => {
    readList = [...readList,starting.startingPoint]
    // console.log(readList)
    console.log(allList.filter(read => read.startingPoint != readList)) 
  })
})
// loop2




