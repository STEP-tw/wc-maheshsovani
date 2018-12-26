const SPACE = " ";
const TAB = "\t";
const EMPTYSTR = "";
const NEWLINE = "\n";
const { parser } = require("./parser.js");

const readContent = function(readFileSync, file) {
  return readFileSync(file, "utf8");
};

const countLines = function(file) {
  return file.split("\n").length - 1;
};

const countBytes = function(file) {
  return file.split("").length;
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
  let content = file.split("");
  let words = content
    .map(replace)
    .join(EMPTYSTR)
    .split(NEWLINE)
    .filter(isNotEmpty);
  return words.length;
};

const requiredAction = {
  l: countLines,
  c: countBytes,
  w: countWords
};

const wc = function(args, fs) {
  const { readFileSync } = fs;
  const { file, option } = parser(args);
  let content = readContent(readFileSync,file);
  let linesCount = countLines(content);
  let wordsCount = countWords(content);
  let bytesCount = countBytes(content);
  if (option != undefined) {
    return requiredAction[option](content) + TAB + file;
  }
  return [linesCount, wordsCount, bytesCount , file ].join('\t');
};

module.exports = { wc };