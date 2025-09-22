const fs = require('fs');
const path = require('path');

const uiFolder = path.join(__dirname, 'src', 'components', 'ui');

const radixPackages = [
  'dialog',
  'scroll-area',
  'checkbox',
  'switch',
  'tabs',
  'tooltip',
  'select',
  'avatar',
  'toast',
];

fs.readdirSync(uiFolder).forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(uiFolder, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace any @radix-ui imports with proper import
    radixPackages.forEach(pkg => {
      const regex = new RegExp(`@radix-ui/react-${pkg}(@[\\d\\.]+)?`, 'g');
      content = content.replace(regex, `@radix-ui/react-${pkg}`);
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed imports in: ${file}`);
  }
});

console.log('✅ All UI imports fixed!');
