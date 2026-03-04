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
        } else if (file.endsWith('.html')) {
            filelist.push(filepath);
        }
    }
    return filelist;
}

const htmlFiles = getHtmlFiles('.');

for (const filepath of htmlFiles) {
    let content = fs.readFileSync(filepath, 'utf-8');

    // global replacement of exact matches to avoid home2.html getting changed
    const originalContent = content;
    content = content.replace(/href=["']index\.html["']/g, 'href="home2.html"');
    content = content.replace(/href=["']\.\.\/index\.html["']/g, 'href="../home2.html"');
    content = content.replace(/action=["']\.\.\/index\.html["']/g, 'action="../home2.html"');

    // Also update active link on home2.html for Home2
    if (filepath.endsWith('home2.html')) {
        content = content.replace(/<a href="index-2\.html">Home2<\/a>/g, '<a href="home2.html" class="active">Home2</a>');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content);
        console.log('Updated globally ' + filepath);
    }
}
