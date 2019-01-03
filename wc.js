const { wc } = require('./src/lib.js');
const { parser } = require('./src/parser.js');
const fs = require('fs');

const main = function(args) {
  let { options, files, error } = parser(args);
  return error || wc({ files, options }, fs);
};

console.log(main(process.argv.slice(2)));
