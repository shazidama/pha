let createPool = require('./phantomPool')
const $ = require('jquery')
const JsonOutput = require('./jsonOut')
const recurse = require('./recurse')

let pool = new createPool({
  maxUses: 3,
  min: 1,
  max: 2
})

let info = {
  url: 'https://bbs.byr.cn',
  // cookies: cookies,
  login: false,
  draw: true
}
let urls = ['/#default']

let fn = async(instance)=>{
  await instance.createPage()
  const page = await instance.createPage()
  let content = await page.property('content')
  await page.property('viewportSize', { width: 1920, height: 1080 })
  // await info.cookies.map(
  //     (cookie) => {
  //         page.addCookie(cookie)
  //     }
  // ) 
  await page.on('onUrlChanged', (targetUrl) => {__dirname})
  await page.property('frameUrl').then((url) => {
    console.log(url)
  })
  await page.on('onResourceReceived', async(url) => {

  })



  let sgsg = await page.open(info.url + urls[0]).then(
    (status) => {
      console.log('status:', status)
      return status
    }
  )
  console.log(info)
  //此处可以作为交互部分
  if (info.draw)
    await page.evaluate(function() {
      $('#u_login_id').val('linshao')
      $('#u_login_passwd').val('11qq22ww33')
      $('#u_login_submit').click()
    })

  await page.evaluate(function() {
    $('#u_login_submit').click()
  })
  info.login = true
  // const content = await page.property('content')
  // console.log(content)
  let cookies = await page.property('cookies')
  JsonOutput(cookies, '/cookie/byrLinshao.json')

  JsonOutput(urls, '/urls/byrUrls.json')
  console.log('sg')
  content = await page.property('content')
  console.log(content)
  await page.render('pic/sg.png')
  await page.render('pic/sg.png')
  await page.render('pic/sg.png')
  await page.render('pic/sg.png')
  await page.render('pic/sg.png')
  await page.render('pic/sg.png')
  // content = await page.property('content')
  JsonOutput(content, '/content/content.html')
  console.log(content)
}
let fn1 = (word)=>{console.log(word)}
let sgsg = pool.use(fn)
console.log(sgsg)
pool.destroy()