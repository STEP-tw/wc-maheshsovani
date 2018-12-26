const assert = require("assert");
const { wc } = require("../src/lib.js");

const readFileSync = function(fileName) {
  let files = {
    numbers: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9",
    oneLineFile: "mahesh",
    emptyFile:""
  };
  return files[fileName];
};

const existsSync = function(fileName) {
  let existingFiles = ["numbers", "names", "alphabets"];
  return existingFiles.includes(fileName);
};

const fs = { readFileSync, existsSync };

describe("wc", function() {
  it("should return the number of lines, words and bytes seperated with spaces when one file is given without any option", function() {
    let expectedOutput = "9\t10\t19\tnumbers";
    let actaulOutput = wc(["numbers"], fs);
    assert.equal(expectedOutput, actaulOutput);
  });
  it("should return the number of lines, words and bytes when one line file is given", function() {
    let expectedOutput = "0\t1\t6\toneLineFile";
    let actaulOutput = wc(["oneLineFile"], fs);
    assert.equal(expectedOutput, actaulOutput);
  });
  it("should return zero for all parameters when input file is empty", function() {
    let expectedOutput = "0\t0\t0\temptyFile";
    let actaulOutput = wc(["emptyFile"], fs);
    assert.equal(expectedOutput, actaulOutput);
  });

  it("should return number of lines when -l option is given", function() {
    let expectedOutput = "9\tnumbers";
    let actaulOutput = wc(["-l" , "numbers"], fs);
    assert.equal(expectedOutput, actaulOutput);
  });

  it("should return number of bytes when -c option is geven", function() {
    let expectedOutput = "19\tnumbers";
    let actaulOutput = wc(["-c" , "numbers"], fs);
    assert.equal(expectedOutput, actaulOutput);
  });

  it("should return number of bytes when -c option is geven", function() {
    let expectedOutput = "10\tnumbers";
    let actaulOutput = wc(["-w" , "numbers"], fs);
    assert.equal(expectedOutput, actaulOutput);
  });
});
