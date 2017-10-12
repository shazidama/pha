let createPool = require('./phantomPool')
const $ = require('jquery')
const JsonOutput = require('./jsonOut')
// const recurse = require('./recurse')

let pool = new createPool({
  maxUses: 3,
  min: 1,
  max: 2
})

let info = {
  url: 'https://bbs.byr.cn',
  // url: 'http://localhost:8082/show',
  // cookies: cookies,
  login: false,
  hascookie: false
}
let urls = ['/#default']

let fn = async(instance)=>{
  await instance.createPage()
  const page = await instance.createPage()
  // await page.setting('loadImages',false).then(v=>{console.log(v)})
  let content = await page.property('content')
  await page.property('viewportSize', 
    { width: 1920, height: 1080 }
  )

  await page.on('onResourceRequested',()=>{
  })
  
  await page.on('onLoadFinished',async()=>{
    let content = await page.property('content')
    // console.log(content,'loadFinished')
  })
  
  await page.on('onUrlChanged', 
    (targetUrl) => {__dirname}
  )
  
  await page.property('frameUrl').then((url) => {
    console.log(url)
  })
  
  await page.on('onResourceReceived', async(res) => {
  })


  let sgsg = await page.open(info.url + urls[0]).then(
    (status) => {
      console.log('status:', status)
      return status
    }
  )
  //此处可以作为交互部分
  if (!info.hascookie)
    await page.evaluate(function() {
      $('#u_login_id').val('linshao')
      $('#u_login_passwd').val('11qq22ww33')
      $('#u_login_submit').click()
    })

  await page.evaluate(function() {
    $('#u_login_submit').click()
  })
  info.login = true

  let cookies = await page.property('cookies')
  JsonOutput(cookies, '/cookie/byrLinshao.json')

  JsonOutput(urls, '/urls/byrUrls.json')
  console.log('sg')
  await page.render('pic/sg.png')
  setTimeout(function() {
    
  }, 3000)
  await page.render('pic/sg.png')
  // content = await page.property('content')
  content = await page.property('content')
  JsonOutput(content, '/content/content.html')
  // console.logconsole.log(content)
  await page.render('pic/sg.png')
}

let fn1 = (word)=>{console.log(word)}
let sgsg = pool.use(fn)
console.log(sgsg)
pool.destroy()
