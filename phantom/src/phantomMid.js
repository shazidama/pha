let createPool = require('./phantomPool')
const $ = require('jquery')
const JsonOutput = require('./jsonOut')

class phantomMid {
  constructor(info,midInfo) {
    this.info = info

    this.label = midInfo.content[midInfo.level]
    //the label can be content and div like, label-processing should code to a function
  }

  wait(time) {

  }

  async phantomFunc(instance) {
    await instance.createPage()
    const page = await instance.createPage()
    const info = this.info
    const cookie = info.cookies

    //initial config
    await page.property('viewportSize', 
      { width: 1920, height: 1080 }
    )

    await page.on('onUrlChanged', 
      (targetUrl) => {__dirname}
    )

    await info.cookies.map(
      cookie=>{
        page.addCookie(cookie)
      }
    )
    //continue surfing
    await page.open(info.baseUrl + 'urls[0]'/*just use urls[0] now*/).then(
      (status) => {
        console.log('status:', status)
        return status
      }
    )

    this.wait(500)
    const content = await page.property('content')

    await page.evaluate(function() {

    })

  }

}

module.exports = phantomMid
