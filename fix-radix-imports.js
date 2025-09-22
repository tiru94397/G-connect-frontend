const fs = require("fs");
const path = require("path");

// Path to your UI components folder
const uiFolder = path.join(__dirname, "src/components/ui");

// Regex to match Radix imports with versions
const radixRegex = /@radix-ui\/([\w-]+)@\d+\.\d+\.\d+/g;

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const newContent = content.replace(radixRegex, "@radix-ui/$1");
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log(`Fixed: ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      fixFile(fullPath);
    }
  });
}

walkDir(uiFolder);
console.log("✅ All Radix versioned imports removed!");
