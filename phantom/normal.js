const phantom = require('phantom')
const cookies = require('./cookie/byrLinshao.json')
const urls = require('./urls/byrLinshao.json')

let info = {
  basicUrl: 'https://bbs.byr.cn',
  cookies: cookies,
  draw: false
}

async function normal(basicUrl, url) {

  const instance = await phantom.create()
  const page = await instance.createPage()

  await info.cookies.map(
    (cookie) => {
      page.addCookie(cookie)
    }
  )

  await page.open(info.basicUrl + urls[0]).then(
    (status) => {
      console.log('status', status)
      return status
    }
  )

  let content = await page.property('content')
  let $ = cheerio(content)
  let hrefs = $('a')
  let resArr = hrefs.map((href)=>{
    return href.attribs.href.test('section')//section is regular expression we will test
  })

  return resArr
  instance.exit()

}