var fs = require('fs')
let JsonOutput = (data, outUrl) => {
    let string = JSON.stringify(data, null, 2)
    fs.writeFile(__dirname + outUrl, string, function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

module.exports = JsonOutput