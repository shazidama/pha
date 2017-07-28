const phantom = require('phantom'),
    cookies = require('./cookie/byrLinshao.json'),
    urls = require('./urls/byrUrls.json'),
    cheerio = require('cheerio'),
    _ = require('lodash')

let info = {
    basicUrl: 'https://bbs.byr.cn',
    cookies: cookies,
    formatter: 'section',
    draw: false
}

async function recurse(info, partUrl, urlsRes) {

    const instance = await phantom.create()
    const page = await instance.createPage()

    await info.cookies.map(
        (cookie) => {
            page.addCookie(cookie)
        }
    )

    await page.open(info.basicUrl + partUrl).then(
        (status) => {
            console.log('status', status)
            return status
        }
    )

    let content = await page.property('content')
    let $ = cheerio.load(content)
    let hrefs = $('a')
    let resArr = hrefs.filter((i, href) => {
            return href.attribs.href.match(info.formatter) != null
        } //section is the KEYWORD of the regular expression we will test
    ).map((i, node) => node.attribs.href)
    urlsRes = resArr
    page.render('pic/' + _.replace(partUrl, '/', '_') + '.png')
    instance.exit()

}

let urlArr = []
    // normal(info, urls[0], urlArr)

export default recurse