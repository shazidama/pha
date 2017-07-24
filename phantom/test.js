const phantom = require('phantom');
const $ = require('jquery')
const cookies = require('./cookie/byrLinshao.json')
const JsonOutput = require('./cookie/cookieEdit')


let info = {
    url : 'https://bbs.byr.cn/#default',
    cookies : cookies,
    draw: false
}

let urls = []

async  function pha() {

    const instance = await phantom.create();
    const page = await instance.createPage();

    /*this initial setting
    */
    await page.property('viewportSize', {width: 1920, height: 1080});
    console.log(typeof info.cookies)

    await info.cookies.map(
        (cookie)=>{
            page.addCookie(cookie)
        }
    )
    await page.on('onUrlChanged',(targetUrl)=>{
        urls.push(targetUrl)
    })

    const status = await page.open(info.url).then(
        (status)=>{
            console.log('stst',status)
            return status
        }
    )


    await page.evaluate(function() {
        // $("#u_login_id").val('linshao')
        // $("#u_login_passwd").val('11qq22ww33')
        // $("#u_login_submit").click()
    })
    .then(
        page.render('gwp.png')
    );
    await page.evaluate( function(){ $("#u_login_submit").click() } )

    const content = await page.property('content');
    console.log(content)

    let cookies = await page.property('cookies')
     JsonOutput( cookies, 'byrLinshao.json' )

    await instance.exit();
}

pha()
