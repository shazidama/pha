const phantom = require('phantom');
const $ = require('jquery')
const cookies = require('./cookie/byrLinshao.json')
const JsonOutput = require('./cookie/cookieEdit')
const cheerio = require('cheerio')

//info.url可以作为前端交互部分
let info = {
  url: 'https://bbs.byr.cn/#default',
  cookies: cookies,
  draw: false
}
if (cookies != undefined) {
  info.draw = true
  console.log(info.draw)
}
let urls = []

async function pha() {

  const instance = await phantom.create();
  const page = await instance.createPage();

  /*this initial setting
  */
  await page.property('viewportSize', { width: 1920, height: 1080 })
  await info.cookies.map(
    (cookie) => {
      page.addCookie(cookie)
    }
  )
  await page.on('onUrlChanged', (targetUrl) => {
    urls.push(targetUrl)
  })
  await page.property('frameUrl').then((url)=>{
    console.log(url)
  })
  await page.on('onResourceReceived', (url) => {
    urls.push(url)
    console.log(url)
  })
  
  const status = await page.open(info.url).then(
    (status) => {
      console.log('status:', status)
      return status
    }
  )

  //此处可以作为交互部分
  if(!info.draw)
    await page.evaluate(function () {
      $("#u_login_id").val('linshao')
      $("#u_login_passwd").val('11qq22ww33')
      $("#u_login_submit").click()
    })

  await page.evaluate(function () { 
    //  $("#u_login_submit").click() 
  })

  const content = await page.property('content');
  console.log(content)
  let cookies = await page.property('cookies')
  await JsonOutput(cookies, '/byrLinshao.json')
  await JsonOutput(content, '/content.html')
  await page.render('pic/sg.png')

  await instance.exit();
}

pha()
