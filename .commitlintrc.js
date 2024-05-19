/** @type {import('cz-git').UserConfig} */

const fs = require('fs');
const path = require('path');
const apps = fs.readdirSync(path.resolve(__dirname, 'apps'));
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'));

module.exports = {
  rule: {},
  prompt: {
    useEmoji: true,
    markBreakingChangeMode: true,
    scopes: ['root', ...apps, ...packages],
  },
};
