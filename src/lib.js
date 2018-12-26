const SPACE = " ";
const TAB = "\t";
const EMPTYSTR = " ";
const NEWLine = "\n"

const readContent = function(readFileSync, file) {
  return readFileSync(file[0], "utf8");
};

const countLines = function(file) {
  return file.split("\n").length;
};

const countBytes = function(file) {
  return file.split("").length;
};

const replace = function(character) {
  if (character == SPACE) {
    character = NEWLine;
  }
  return character;
};

const isNotEmpty = function(character){
  return character != EMPTYSTR;
}

const countWords = function(file) {
  let content = file.split("");
  let words = content.map(replace).join(EMPTYSTR).split(NEWLine).filter(isNotEmpty);
  return words.length;
};

const wc = function(files, fs) {
  const { readFileSync } = fs;
  let content = readContent(readFileSync, files);
  let linesCount = countLines(content) - 1;
  let wordsCount = countWords(content);
  let byteCount = countBytes(content);
  let result = ["", linesCount, wordsCount, byteCount].join(TAB) + SPACE + files;
  return result;
};

module.exports = { wc };