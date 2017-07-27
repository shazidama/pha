let fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    pageURL = 'https://segmentfault.com/questions',
    string = []

function req(pageURL,index,string) {
    request(pageURL, (err, res, body) => {
        $ = cheerio.load(body)
        index--
        let host = res.request.uri.host
        let pagination = $('.pagination')
        let hreff = $('a')
        let next = pagination.find('.next').find('a').attr('href')
        let nextURL = 'https://'+host+next

        let ulContent = $('.stream-list__item')
        let dataArray = []
        let questions = ulContent.find('.summary').find('.title').find('a')
        questions.toArray()
        questions.map( (i, question) => {
            dataArray.push({
                text: question.children[0].data,
                url: pageURL + question.attribs['href']
            })
        })
        string = string.concat(dataArray)

        outputPath = 'url.json'+index
        if(index==0) {
            string = JSON.stringify(string, null, '  ')
            fs.writeFile(outputPath, string, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
                return outputPath
            });
            return 'gg'
        }
        req(nextURL,index,string)
    })
}

req(pageURL,1,string)

