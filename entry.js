const fs = require('fs');
const path = require('path');

const directory = path.resolve(__dirname, './src/pages') ;
const entryList = {};

(getEntry = (dir) => {

    const entryArr = fs.readdirSync(dir);
    let pathName,
        filePath;

    entryArr.forEach(function(filename) {

        filePath = dir + '/' + filename; 
        if(fs.statSync(filePath).isDirectory()) {

            getEntry(filePath);

        } else {

            pathName = filePath.split('pages/')[1].replace('.js', '');
            entryList[pathName] = filePath;

        }

    })

})(directory)

module.exports = entryList
