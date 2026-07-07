const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
let count = 0;
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('â€”')) {
    console.log('Found in ' + f);
    content = content.replace(/â€”/g, '-');
    fs.writeFileSync(f, content, 'utf8');
    count++;
  }
}
console.log('Fixed ' + count + ' files.');
