const { wc } = require("./src/lib.js");
const fs = require("fs");

const main = function (args){
  let result = wc( args , fs );
  return result ;
}
console.log(main(process.argv.slice(2)));