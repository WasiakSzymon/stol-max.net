var fs = require('fs')
fs.readFile('./dist/stolmax/browser/index.html', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    var result = data.replace(/<script src="runtime/g, '<script nonce="random-csp-nonce" src="runtime');
    result = result.replace(/<script src="polyfills/g, '<script nonce="random-csp-nonce" src="polyfills');
    result = result.replace(/<script src="scripts/g, '<script nonce="random-csp-nonce" src="scripts');
    result = result.replace(/<script src="main/g, '<script nonce="random-csp-nonce" src="main');
    result = result.replace(/<script id="ng-state"/g, '<script nonce="random-csp-nonce" id="ng-state"');

    fs.writeFile('./dist/stolmax/browser/index.html', result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

// const exec = require('child_process').exec;
// const fs = require('fs');
// const path = require('path');

// // find the styles css file
// const files = getFilesFromPath('./dist/stolmax/browser', '.css');
// let data = [];

// if (!files && files.length <= 0) {
//     console.log("cannot find style files to purge");
//     return;
// }

// for (let f of files) {
//     // get original file size
//     const originalSize = getFilesizeInKiloBytes('./dist/stolmax/browser/' + f) + "kb";
//     var o = { "file": f, "originalSize": originalSize, "newSize": "" };
//     data.push(o);
// }

// console.log("Run PurgeCSS...");

// exec("purgecss -css dist/stolmax/browser/*.css --content dist/stolmax/browser/index.html dist/stolmax/browser/*.js -o dist/stolmax/browser/", function (error, stdout, stderr) {
//     console.log("PurgeCSS done");
//     console.log();

//     for (let d of data) {
//         // get new file size
//         const newSize = getFilesizeInKiloBytes('./dist/stolmax/browser/' + d.file) + "kb";
//         d.newSize = newSize;
//     }

//     console.table(data);
// });

// function getFilesizeInKiloBytes(filename) {
//     var stats = fs.statSync(filename);
//     var fileSizeInBytes = stats.size / 1024;
//     return fileSizeInBytes.toFixed(2);
// }

// function getFilesFromPath(dir, extension) {
//     let files = fs.readdirSync(dir);
//     return files.filter(e => path.extname(e).toLowerCase() === extension);
// }