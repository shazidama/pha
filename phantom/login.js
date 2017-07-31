const phantom = require('phantom');
const $ = require('jquery')
    // const cookies = require('./cookie/byrLinshao.json')
const JsonOutput = require('./jsonOut')
const cheerio = require('cheerio')

//info.url可以作为前端交互部分
let info = {
    url: 'https://bbs.byr.cn',
    // cookies: cookies,
    draw: false
}
let urls = ['/#default']

async function pha() {

    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.property('viewportSize', { width: 1920, height: 1080 })
        // await info.cookies.map(
        //     (cookie) => {
        //         page.addCookie(cookie)
        //     }
        // ) 
    await page.on('onUrlChanged', (targetUrl) => {})
    await page.property('frameUrl').then((url) => {
        console.log(url)
    })
    await page.on('onResourceReceived', (url) => {})



    const status = await page.open(info.url + urls[0]).then(
        (status) => {
            console.log('status:', status)
            return status
        }
    )

    //此处可以作为交互部分
    if (!info.draw)
        await page.evaluate(function() {
            $("#u_login_id").val('linshao')
            $("#u_login_passwd").val('11qq22ww33')
            $("#u_login_submit").click()
        })

    await page.evaluate(function() {
        $("#u_login_submit").click()
    })

    const content = await page.property('content');
    // console.log(content)
    let cookies = await page.property('cookies')
    JsonOutput(cookies, '/cookie/byrLinshao.json')
    JsonOutput(content, '/content/content.html')
    JsonOutput(urls, '/urls/byrUrls.json')
    console.log('sg')
    await page.render('pic/sg.png')
    await page.render('pic/sg.png')

    await instance.exit();
}

pha()