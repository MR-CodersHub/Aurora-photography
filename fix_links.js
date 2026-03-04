const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getHtmlFiles(filepath, filelist);
            }
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
            filelist.push(filepath);
        }
    }
    return filelist;
}

const allFiles = getHtmlFiles('.');

for (const filepath of allFiles) {
    if (filepath.includes('update_nav')) continue; // skip my own scripts

    let content = fs.readFileSync(filepath, 'utf-8');
    if (content.includes('home2.html')) {
        content = content.replace(/index-2\.html/g, 'home2.html');
        fs.writeFileSync(filepath, content);
        console.log(`Updated links in ${filepath}`);
    }
}
