const { wc } = require("./src/lib.js");
const fs = require("fs");

const main = function (fileNames){
  let result = wc( fileNames , fs );
  return result ;
}
console.log(main(process.argv.slice(2)));