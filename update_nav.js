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
    let lines = content.split('\n');
    let changed = false;

    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Ensure we don't carry over SIGNATURE links
        if (line.includes('index-2.html') && /SIGNATURE/i.test(line)) {
            changed = true;
            continue; // Drop line
        }

        // Drop footer 'Signature' link
        if (line.includes('index-2.html') && /Signature/i.test(line)) {
            changed = true;
            continue; // Drop line
        }

        // Replace Home with Home2
        if (/>\s*Home\s*<\/a>/i.test(line) && /href=["'](\.\.\/)*index\.html["']/i.test(line)) {
            line = line.replace(/href=(['"])((?:\.\.\/)*)index\.html(['"])/i, 'href=$1$2index-2.html$3');
            line = line.replace(/(>\s*)Home(\s*<\/a>)/i, '$1Home2$2');
            changed = true;
        }

        // In footer there's also Explore -> Home text 
        if (/href=["'](\.\.\/)*index\.html["']/i.test(line) && /Home/i.test(line)) {
             line = line.replace(/href=(['"])((?:\.\.\/)*)index\.html(['"])/i, 'href=$1$2index-2.html$3');
             line = line.replace(/(>\s*)Home(\s*<\/a>)/i, '$1Home2$2');
             changed = true;
        }
        
        // Also the login text internal buttons e.g "Back to Home"
        if (line.includes('index.html') && line.includes('Back to Home2')) {
            line = line.replace('index.html', 'index-2.html');
            changed = true;
        }
        if (line.includes('index.html') && line.includes('Back to Home')) {
            line = line.replace('index.html', 'index-2.html')
            line = line.replace('Back to Home', 'Back to Home2');
            changed = true;
        }

        newLines.push(line);
    }

    if (changed) {
        fs.writeFileSync(filepath, newLines.join('\n'));
        console.log('Updated ' + filepath);
    }
}
