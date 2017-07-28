const phantom = require('phantom'),
    createPhantomPool = require('phantom-pool'),
    cookies = require('./cookie/byrLinshao.json'),
    urls = require('./urls/byrUrls.json'),
    _ = require('lodash'),
    recurce = require('recurse')


const pool = createPhantomPool()

const withPool = (url) => pool.use(
    async(instance) => {
        const page = await instance.createPage()
        const status = await page.open(url, { operation: 'GET' })
        if (status !== 'success') throw new Error(status)
        const content = await page.property('content')
        console.log(content)
    })