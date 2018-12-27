const SPACE = " ";
const TAB = "\t";
const EMPTYSTR = "";
const NEWLINE = "\n";
const { parser } = require("./parser.js");

const readContent = function(readFileSync, file) {
  return readFileSync(file, "utf8");
};

const countLines = function(file) {
  return file.split(NEWLINE).length - 1;
};

const countBytes = function(file) {
  return file.split(EMPTYSTR).length;
};

const replace = function(character) {
  if (character == SPACE) {
    character = NEWLINE;
  }
  return character;
};

const isNotEmpty = function(character) {
  return character != EMPTYSTR;
};

const countWords = function(file) {
  let content = file.split(EMPTYSTR);
  let words = content
    .map(replace)
    .join(EMPTYSTR)
    .split(NEWLINE)
    .filter(isNotEmpty);
  return words.length;
};

const wc = function(args, fs) {
  const { readFileSync } = fs;
  const { files, options } = parser(args);
  let output = [];
  let content = readContent(readFileSync, files[0]);
  let linesCount = countLines(content);
  let wordsCount = countWords(content);
  let bytesCount = countBytes(content);

  if (options.includes("l")) {
    output += TAB + linesCount;
  }

  if (options.includes("w")) {
    output += TAB + wordsCount;
  }

  if (options.includes("c")) {
    output += TAB + bytesCount;
  }
  return output + SPACE + files[0];
};

module.exports = { wc };
