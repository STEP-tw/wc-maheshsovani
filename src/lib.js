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

const isNotEmpty = function(character) {
  return character != EMPTYSTR;
};

const splitBy = function(seperator, content) {
  return content.split(seperator);
};

const removeSpacesAndNewLine = splitBy.bind(null, /[ \n]+/);

const countWords = function(file) {
  return removeSpacesAndNewLine(file).filter(isNotEmpty).length;
};

const getAllCounts = function(content) {
  let linesCount = countLines(content);
  let wordsCount = countWords(content);
  let bytesCount = countBytes(content);
  return { linesCount, wordsCount, bytesCount };
};

const wc = function(args, fs) {
  const { readFileSync } = fs;
  const { files, options } = parser(args);
  let output = [];
  let content = readContent(readFileSync, files[0]);
  let { linesCount, wordsCount, bytesCount } = getAllCounts(content);

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
