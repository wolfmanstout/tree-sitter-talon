#!/usr/bin/env node --trace-warnings --unhandled-rejections=strict

const fs = require('fs');
const Parser = require('web-tree-sitter');

if (process.argv.length < 3) {
  console.log('Usage: script/tree-sitter-parse.js <file..>')
  process.exit(1)
}

Parser.init().then(() => {
  Parser.Language.load('tree-sitter-talon.wasm').then((Talon) => {
    const parser = new Parser;
    parser.setLanguage(Talon);
    for (let i = 2; i < process.argv.length - 1; i++) {
      const fileName = process.argv[i]
      const sourceCode = fs.readFileSync(fileName, 'utf8')
      const tree = parser.parse(sourceCode);
    }
  });
});