#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const __1 = require("..");
if (process.argv.length !== 3) {
    console.error('Usage: RdfXmlParser-perf.js filename');
    process.exit(1);
}
const fileName = (0, path_1.resolve)(process.cwd(), process.argv[2]);
const options = { baseIRI: 'file://' + fileName };
const TEST = '- Parsing file ' + fileName;
console.time(TEST);
let count = 0;
(0, fs_1.createReadStream)(fileName)
    .pipe(new __1.RdfXmlParser(options))
    .on('data', () => count++)
    .on('error', (e) => {
    console.error(e);
    process.exit(1);
})
    .on('end', () => {
    console.timeEnd(TEST);
    console.log('* Quads parsed: ' + count);
    console.log('* Memory usage: ' + Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB');
});
//# sourceMappingURL=RdfXmlParser-perf.js.map