#!/usr/bin/env node
import fs from 'node:fs';
const target = process.argv[process.argv.indexOf('--output-last-message') + 1];
if (target) fs.writeFileSync(target, 'fixture research report\n');
process.stdout.write('fixture runner\n');
