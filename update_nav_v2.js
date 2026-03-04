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

const navbarScriptTag = (depth) => {
    const prefix = '../'.repeat(depth);
    return `<script src="${prefix}js/navbar.js" defer></script>`;
};

for (const filepath of htmlFiles) {
    let content = fs.readFileSync(filepath, 'utf-8');
    const relativePath = path.relative(process.cwd(), filepath);
    const depth = relativePath.split(path.sep).length - 1;

    // 1. Add navbar.js script tag before main.js or at end of head
    if (!content.includes('js/navbar.js')) {
        if (content.includes('js/main.js')) {
            content = content.replace(/<script src="([^"]*)js\/main\.js"/, `${navbarScriptTag(depth)}\n    <script src="$1js/main.js"`);
        } else {
            content = content.replace('</head>', `    ${navbarScriptTag(depth)}\n</head>`);
        }
    }

    // 2. Clean up the header content to let navbar.js handle it
    // We look for <header id="main-header">...</header> and replace it with just the shell
    // This is safer than leaving it full of old content
    const headerRegex = /<header id="main-header">[\s\S]*?<\/header>/i;
    const headerShell = `<header id="main-header"></header>`;

    if (headerRegex.test(content)) {
        content = content.replace(headerRegex, headerShell);
    }

    fs.writeFileSync(filepath, content);
    console.log(`Updated ${filepath}`);
}
