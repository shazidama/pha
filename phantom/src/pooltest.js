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
  baseUrl: 'https://bbs.byr.cn',
  // url: 'http://localhost:8082/show',
  // cookies: cookies,
  login: false,
  hascookie: false
}
let urls = ['/#default']

let fn = async(instance)=>{
  await instance.createPage()
  const page = await instance.createPage()
  let content = await page.property('content')
  await page.property('viewportSize', 
    { width: 1920, height: 1080 }
  )

  await page.on('onResourceRequested',()=>{
  })
  
  await page.on('onLoadFinished',async()=>{
    // let content = await page.property('content')
    // console.log(content,'loadFinished')
  })
  
  await page.on('onUrlChanged', 
    (targetUrl) => {__dirname}
  )
  
  await page.open(info.baseUrl + urls[0]).then(
    (status) => {
      console.log('status:', status)
      return status
    }
  ).then((status)=>{
    // const content = page.property('content').then(content=>{console.log(content)})
    // console.log(content)
  })
  //此处可以作为交互部分
  if (!info.hascookie)
    await page.evaluate(function() {
      $('#u_login_id').val('linshao')
      $('#u_login_passwd').val('11qq22ww33')
      $('#u_login_submit').click()
    })

  content = await page.property('content')
  // console.log('content2',content)
  await page.evaluate(function() {
    $('#u_login_submit').click()
  })
  info.login = true

  await page.render('pic/sg.png')
  setTimeout( () => {
  }, 1000)
  const content1 = await page.property('content')
  const cookies = await page.property('cookies')
  JsonOutput(content1, '/content/content.html')
  JsonOutput(cookies, '/cookie/byrLinshao.json')
  JsonOutput(urls, '/urls/byrUrls.json')
  await page.render('pic/sg.png')
  await page.render('pic/sg.png')
}

let sgsg = pool.use(fn)
pool.destroy()
