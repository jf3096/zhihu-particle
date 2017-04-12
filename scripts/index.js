const ghPages = require('gh-pages');
const path = require('path');

const targetDirectory = path.join(__dirname, '../demo/zhihu-inferno/www');
ghPages.publish(targetDirectory, (err) => {
    if (err) {
        console.log(err);
    }
});