const ghpages = require('gh-pages');
const path = require('path');

const targetDirectory = path.join(__dirname, '../demo/zhihu/www');
ghpages.publish(targetDirectory, (err) => {
    if (err) {
        throw err;
    }
});