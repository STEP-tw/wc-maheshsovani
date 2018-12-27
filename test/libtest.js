const assert = require("assert");
const { wc } = require("../src/lib.js");

const readFileSync = function(fileName) {
  let files = {
    numbers: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9",
    oneLineFile: "mahesh",
    emptyFile: "",
    alphabets: " a\n b\n c\n d\n e\n f"
  };
  return files[fileName];
};

const existsSync = function(fileName) {
  let existingFiles = ["numbers", "names", "alphabets"];
  return existingFiles.includes(fileName);
};

const fs = { readFileSync, existsSync };

describe("wc", function() {
  describe("single option test cases", function() {
    it("should return the number of lines, words and bytes when option is not given", function() {
      let expectedOutput = "9\t10\t19 numbers";
      let actualOutput = wc(["numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it("should return the number of lines, words and bytes when one line file is given", function() {
      let expectedOutput = "0\t1\t6 oneLineFile";
      let actualOutput = wc(["oneLineFile"], fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it("should return zero for all parameters when input file is empty", function() {
      let expectedOutput = "0\t0\t0 emptyFile";
      let actualOutput = wc(["emptyFile"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines when -l option is given", function() {
      let expectedOutput = "9 numbers";
      let actualOutput = wc(["-l", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of bytes when -c option is given", function() {
      let expectedOutput = "19 numbers";
      let actualOutput = wc(["-c", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of words when -w option is given", function() {
      let expectedOutput = "10 numbers";
      let actualOutput = wc(["-w", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });
  });
  describe("multiple option test cases", function() {
    it("should return the number of lines and words when one file is given with -l and -w option is given", function() {
      let expectedOutput = "9\t10 numbers";
      let actualOutput = wc(["-l", "-w", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it("should return the number of lines, words when one line file is given", function() {
      let expectedOutput = "0\t1 oneLineFile";
      let actualOutput = wc(["-w", "-l", "oneLineFile"], fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it("should return zero for lines and bytes count when input file is empty", function() {
      let expectedOutput = "0\t0 emptyFile";
      let actualOutput = wc(["-l", "-c", "emptyFile"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return zero for lines and bytes count when input file is empty", function() {
      let expectedOutput = "9\t19 numbers";
      let actualOutput = wc(["-c", "-l", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of bytes and words when -c and -w options are given", function() {
      let expectedOutput = "10\t19 numbers";
      let actualOutput = wc(["-c", "-w", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of bytes and words when  -c -w options are given", function() {
      let expectedOutput = "10\t19 numbers";
      let actualOutput = wc(["-w", "-c", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let expectedOutput = "9\t10\t19 numbers";
      let actualOutput = wc(["-w", "-c", "-l", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let expectedOutput = "9\t10\t19 numbers";
      let actualOutput = wc(["-c", "-w", "-l", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let expectedOutput = "9\t10\t19 numbers";
      let actualOutput = wc(["-w", "-l", "-c", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let expectedOutput = "9\t10\t19 numbers";
      let actualOutput = wc(["-c", "-l", "-w", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let expectedOutput = "9\t10\t19 numbers";
      let actualOutput = wc(["-l", "-w", "-c", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let expectedOutput = "9\t10\t19 numbers";
      let actualOutput = wc(["-l", "-c", "-w", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let expectedOutput = "9\t10\t19 numbers";
      let actualOutput = wc(["-lwc", "numbers"], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let actualOutput = wc(["-wlc", "numbers"], fs);
      let expectedOutput = "9\t10\t19 numbers";
      assert.equal(expectedOutput, actualOutput);
    });

    it("should return number of lines , words, and bytes when all options are given by maintaining fixed sequence", function() {
      let actualOutput = wc(["-wlc", "alphabets"], fs);
      let expectedOutput = "5\t6\t17 alphabets";
      assert.equal(expectedOutput, actualOutput);
    });
  });
  describe("multiple files", function() {
    it("should return the lines,bytes and words count along with total of them for multiple files", function() {
      actualOutput = wc(["-wlc", "alphabets", "numbers", "oneLineFile"], fs);
      expectedOutput =
        "5\t6\t17 alphabets\n9\t10\t19 numbers\n0\t1\t6 oneLineFile\n14\t17\t42 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
