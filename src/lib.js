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

const formatter = function(args) {
  let { output, file } = args;
  return output.join(TAB) + SPACE + file;
};

const singleFileCounts = function(options, fs, file) {
  const { readFileSync } = fs;
  let content = readContent(readFileSync, file);
  let { linesCount, wordsCount, bytesCount } = getAllCounts(content);
  let output = [];
  if (options.includes("l")) {
    output.push(linesCount);
  }

  if (options.includes("w")) {
    output.push(wordsCount);
  }

  if (options.includes("c")) {
    output.push(bytesCount);
  }
  return { output, file };
};

let getTotal = function(firstList, secondList) {
  let outputSum = [];
  for (let counter = 0; counter < firstList.length; counter++) {
    outputSum[counter] = firstList[counter] + secondList[counter];
  }
  return outputSum;
};

let multipleFileData = function(fs, args) {
  let { options, files } = args;
  let getSingleFileContent = singleFileCounts.bind(null, options, fs);
  let wholeData = files.map(getSingleFileContent);
  let totalInput = wholeData.map(element => element.output);
  let total = totalInput.reduce(getTotal);
  wholeData.push({ output: total, file: "total" });
  let finalResult = wholeData.map(formatter);
  return finalResult.join(NEWLINE);
};

const wc = function(args, fs) {
  let { options, files } = parser(args);
  let result = singleFileCounts(options, fs, files[0]);
  let singleFileOutput = formatter(result);

  if (files.length == 1) {
    return singleFileOutput;
  }
  return multipleFileData(fs, { options, files });
};

module.exports = { wc };
