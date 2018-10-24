// Importer
const promises = require('request-promise')
const cheerio = require('cheerio')
//
let allList = [{startingPoint: 'bangkok' }]
let readList = []
let matchingList = []
let counter = 0
let running = true
//
const readstartingfilter = allList.filter(read => read.startingPoint != readList)
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
    matchingList = res
    readList = [...readList,starting.startingPoint]
    console.log(allList.filter(read => read.startingPoint != readList)) 
  })
  .then(res => {
    matchingList.map(item => {
      allList= [...allList,{startingPoint : item.endingPoint}]
    })
    return allList
  })
})

//program
while (running == true){
  readstartingfilter.map(starting => {
    if (starting != []){
      const pageStock = []
      const URL = `https://12go.asia/en/travel/${starting.startingPoint}`
      const options = {
        uri: URL,
        transform: body => scrapList(cheerio.load(body), pageStock,starting.startingPoint)
      }
      //
      promises(options)
      .then(res => {
        matchingList = res
        readList = [...readList,starting.startingPoint]
        console.log(allList.filter(read => read.startingPoint != readList)) 
      })
      .then(res => {
        matchingList.map(item => {
          allList= [...allList,{startingPoint : item.endingPoint}]
        })
        return allList
      })
    } else{
      counter++
      if (counter == 3){
        running = false
      }
    }
  })

}