// Importer
const promises = require('request-promise')
const cheerio = require('cheerio')
//
let startingList = [ { startingPoint: 'bangkok' },]
// { startingPoint: 'ao-nang' },
// { startingPoint: 'chaiyaphum' },
// { startingPoint: 'chiang-mai' },
// { startingPoint: 'chiang-rai' },
// { startingPoint: 'chumphon' },
// { startingPoint: 'don-mueang-airport' },
// { startingPoint: 'hat-yai' },
// { startingPoint: 'kanchanaburi' },
// { startingPoint: 'khon-kaen' },
// { startingPoint: 'koh-lipe' },
// { startingPoint: 'koh-phangan' },
// { startingPoint: 'koh-phayam' },
// { startingPoint: 'koh-samui' },
// { startingPoint: 'koh-tao' },
// { startingPoint: 'krabi' },
// { startingPoint: 'laem-chabang' },
// { startingPoint: 'lampang' },
// { startingPoint: 'lamphun' },
// { startingPoint: 'loei' },
// { startingPoint: 'mahasarakham' },
// { startingPoint: 'mukdahan' },
// { startingPoint: 'nakhon-phanom' },
// { startingPoint: 'nakhon-si-thammarat' },
// { startingPoint: 'nan' },
// { startingPoint: 'nong-bua-lamphu' },
// { startingPoint: 'nong-khai' },
// { startingPoint: 'nonthaburi' },
// { startingPoint: 'phang-nga' },
// { startingPoint: 'phattalung' },
// { startingPoint: 'phetchabun' },
// { startingPoint: 'phitsanulok' },
// { startingPoint: 'phrae' },
// { startingPoint: 'phuket' },
// { startingPoint: 'ranong' },
// { startingPoint: 'roi-et' },
// { startingPoint: 'sakon-nakhon' },
// { startingPoint: 'satun' },
// { startingPoint: 'sisaket' },
// { startingPoint: 'songkhla' },
// { startingPoint: 'sukhothai' },
// { startingPoint: 'suratthani' },
// { startingPoint: 'surin' },
// { startingPoint: 'suvarnabhumi-airport' },
// { startingPoint: 'trang' },
// { startingPoint: 'ubon-ratchathani' },
// { startingPoint: 'udonthani' },
// { startingPoint: 'yala' },
// { startingPoint: 'yasothon' } ]
let readList = []
let matchingList = []
let counter = 0
let running = true
//
const scrapList = (loadble, stock,startingPoint) => {
  const list = loadble('div.page-block div.block-card ul.text-columns-2 a')
  list.map((index, item) => {
    try {
      const destinations = {
        startingPoint: startingPoint ,
        endingPoint : item.attribs.href.replace(`/en/travel/${startingPoint}/`,"") ,
        href : `https://12go.asia${item.attribs.href}`
      }
      stock = [...stock, destinations]
    } catch (err) {}
  })
  return stock
}
// 
async function scrapAllList(readstartingfilter,matchingList,readList) {
  readstartingfilter.map(async starting => {
    const pageStock = []
    const URL = `https://12go.asia/en/travel/${starting.startingPoint}`
    const options = {
      uri: URL,
      transform: body => scrapList(cheerio.load(body), pageStock,starting.startingPoint)
    }
    //
    await promises(options)
    .then(res => {
      matchingList = res
      readList = [...readList,starting.startingPoint]
    })
    .then(res => {
      matchingList.map(item => {
        startingList= [...startingList,{startingPoint : item.endingPoint}]
      })
      return startingList,matchingList,readList
    })
    console.log('\nc1\n',startingList,'\nc2\n',matchingList,'\nc3\n',readList)
    return startingList,matchingList,readList
  })

}
// loop1
async function updateAllList(startingList,readList) {
  const readstartingfilter = startingList.filter(read => read.startingPoint != readList)
  try {
    const AllList = await scrapAllList(readstartingfilter,matchingList,readList)
    console.log('C4',AllList)

  } catch(error) {
  console.error(error.message)
  }
}
//
updateAllList(startingList,readList)

