const fs = require('fs');
const path = require('path');

const iconPath = path.resolve(__dirname, './icon');
console.log(iconPath);

fs.readdir(iconPath, function (err, files) {
    files.forEach((fileName) => {
        if (fileName.match(/\.svg$/)) {
            const fileDir = path.join(iconPath, fileName);
            fs.readFile(fileDir, 'utf-8', function (err, data) {
                fs.writeFile(fileDir, data.replace(/<title>.*?<\/title>/, ''), function (err) {
                    console.log(err);
                });
            });
        }
    });
});
