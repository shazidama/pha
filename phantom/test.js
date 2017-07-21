const phantom = require('phantom');
const $ = require('jquery')
const BYRcookie = require('./cookie/byrLinshao.json')
var fs = require('fs')


let draw = false

let sfCookie = {
    "PHPSESSID":"web2~459ovavquvu9iqbuugkjsu5kt7; ",
    "_gat":"1; ",
    "io":"klMbTR3-tHdmwQfoI1Gn; ",
    "_ga":"GA1.2.1533163990.1497274788; ",
    "_gid":"GA1.2.1280341952.1500274993; ",
    "Hm_lvt_e23800c454aa573c0ccb16b52665ac26":"1500455882,1500514579,1500514628,1500514898; ",
    // "Hm_lpvt_e23800c454aa573c0ccb16b52665ac26":"1500515557;"
    "sf_remember":"ffbf0d9dfb19267d7589f4f74078ab33",
    "Hm_lpvt_e23800c454aa573c0ccb16b52665ac26":"1500517177"
    // io=elrCZfWunNgfzy1bSr4T
}

let cookie = {
    "Hm_lvt_38b0e830a659ea9a05888b924f641842":"1500622549,1500623877,1500623972,1500624050",
    "Hm_lpvt_38b0e830a659ea9a05888b924f641842":"1500622549",
    "login-user":"linshao",
    "nforum[UTMPUSERID]":"linshao",
    "nforum[UTMPKEY]":"79982840",
    "nforum[UTMPNUM]":"3941",
    "nforum[PASSWORD]":"dnAOGndWHKv8kbwLCzAykA%3D%3D"
}

let objArrish = (obj)=>{
    let keys = Object.keys(obj)
    return keys.map((head)=>{
        return {
            'name':head,
            'value':obj[head],
            'path':'/'
        }
    })
}
let cookieArray = objArrish(cookie)

async  function pha() {

    const instance = await phantom.create();
    const page = await instance.createPage();

    await BYRcookie.map((cookie)=>page.addCookie(cookie))
    const status = await page.open('https://bbs.byr.cn/#default').then(
        (status)=>{
            console.log('stst',status)
            return status
        }
    )

    await page.on('onUrlChanged',(targetUrl)=>{
        console.log(targetUrl+'sg')
    })
    await page.on('onResourceRequested',(requestData, networkRequest)=>{
        console.log(requestData,'data')
    })

    await page.property('viewportSize', {width: 1920, height: 1080});

    await page.evaluate(function() {
        // $("#u_login_id").val('linshao')
        // $("#u_login_passwd").val('11qq22ww33')
        // $("#u_login_cookie").click()
        // $("#u_login_submit").click()
         // $("#m_inbox").click()
    })
    .then(
        page.render('gwp.png')
    );
    // setTimeout(()=>{ page.render('sg92.png')
    //      instance.exit();
    // },5000)
    await page.render('sg0.png')
    await page.evaluate(function() {
        $("#u_login_submit").click()
    })
    .then(
    );
    await page.evaluate(function() {
        $("#m_inbox").click()
    })
    .then(
        console.log('sgsgsg')
    );

    const content = await page.property('content');
    console.log(content)

    let cookies = await page.property('cookies')
    console.log(cookies)
    let JsonString = JSON.stringify(cookies,null,2)
    fs.writeFile('./cookie/byrLinshao.json', JsonString , function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });

    await instance.exit();
}

pha().then((res)=>{
    //console.log(res)
})
