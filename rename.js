var path = require('path');
var fs = require('fs');


//大写字母改小写
function rename(pathFile) {

    if(!path.isAbsolute(pathFile)) {
        pathFile = path.join(__dirname, pathFile);
    }

    var stats = fs.statSync(pathFile);

    if (stats.isFile()) {
        var base = path.parse(pathFile);
        fs.renameSync(pathFile, path.join(base.dir, base.base[0].toLowerCase() + base.base.slice(1)));
    } else {
        var dir = fs.readdirSync(pathFile);
        dir.forEach(function (item) {
            rename(path.join(pathFile, item));
        })
    }
    
}

rename(path.join(__dirname, 'src'));