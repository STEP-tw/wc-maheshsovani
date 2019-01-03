/* eslint-env mocha */

const assert = require('assert');
const { wc } = require('../src/lib.js');

const readFileSync = function(fileName) {
  let files = {
    numbers: '0\n1\n2\n3\n4\n5\n6\n7\n8\n9',
    oneLineFile: 'mahesh',
    emptyFile: '',
    alphabets: ' a\n b\n c\n d\n e\n f'
  };
  return files[fileName];
};

const existsSync = function(fileName) {
  let existingFiles = ['numbers', 'names', 'alphabets'];
  return existingFiles.includes(fileName);
};

const fs = { readFileSync, existsSync };

describe('wc', function() {
  let expectedOutput;
  let actualOutput;
  describe('single option test cases', function() {
    it('should return the number of lines, words and bytes when option is not given', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc(['numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it('should return the number of lines, words and bytes when one line file is given', function() {
      expectedOutput = '0\t1\t6 oneLineFile';
      actualOutput = wc(['oneLineFile'], fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it('should return zero for all parameters when input file is empty', function() {
      expectedOutput = '0\t0\t0 emptyFile';
      actualOutput = wc(['emptyFile'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines when -l option is given', function() {
      expectedOutput = '9 numbers';
      actualOutput = wc(['-l', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of bytes when -c option is given', function() {
      expectedOutput = '19 numbers';
      actualOutput = wc(['-c', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of words when -w option is given', function() {
      expectedOutput = '10 numbers';
      actualOutput = wc(['-w', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });
  });
  describe('multiple option test cases', function() {
    it('should return the number of lines and words when one file is given with -l and -w option is given', function() {
      expectedOutput = '9\t10 numbers';
      actualOutput = wc(['-l', '-w', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it('should return the number of lines, words when one line file is given', function() {
      expectedOutput = '0\t1 oneLineFile';
      actualOutput = wc(['-w', '-l', 'oneLineFile'], fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it('should return zero for lines and bytes count when input file is empty', function() {
      expectedOutput = '0\t0 emptyFile';
      actualOutput = wc(['-l', '-c', 'emptyFile'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return zero for lines and bytes count when input file is empty', function() {
      expectedOutput = '9\t19 numbers';
      actualOutput = wc(['-c', '-l', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of bytes and words when -c and -w options are given', function() {
      expectedOutput = '10\t19 numbers';
      actualOutput = wc(['-c', '-w', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of bytes and words when  -c -w options are given', function() {
      expectedOutput = '10\t19 numbers';
      actualOutput = wc(['-w', '-c', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc(['-w', '-c', '-l', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc(['-c', '-w', '-l', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc(['-w', '-l', '-c', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc(['-c', '-l', '-w', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc(['-l', '-w', '-c', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc(['-l', '-c', '-w', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc(['-lwc', 'numbers'], fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      let actualOutput = wc(['-wlc', 'numbers'], fs);
      let expectedOutput = '9\t10\t19 numbers';
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      let actualOutput = wc(['-wlc', 'alphabets'], fs);
      let expectedOutput = '5\t6\t17 alphabets';
      assert.equal(expectedOutput, actualOutput);
    });
  });
  describe('multiple files', function() {
    it('should return content of multiple files with total if "lcw" is specified as option', function() {
      actualOutput = wc(['-lcw', 'numbers', 'alphabets'], fs);
      expectedOutput =
        '9\t10\t19 numbers\n5\t6\t17 alphabets\n14\t16\t36 total';
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return content of multiple files with total if "clw" is specified as option"', function() {
      actualOutput = wc(['-clw', 'numbers', 'alphabets'], fs);
      expectedOutput =
        '9\t10\t19 numbers\n5\t6\t17 alphabets\n14\t16\t36 total';
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return content of multiple files with total if "wlc" is specified as option"', function() {
      actualOutput = wc(['-wlc', 'numbers', 'alphabets'], fs);
      expectedOutput =
        '9\t10\t19 numbers\n5\t6\t17 alphabets\n14\t16\t36 total';
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return the lines,bytes and words count along with total of them for multiple files', function() {
      actualOutput = wc(['-wlc', 'alphabets', 'numbers', 'oneLineFile'], fs);
      expectedOutput =
        '5\t6\t17 alphabets\n9\t10\t19 numbers\n0\t1\t6 oneLineFile\n14\t17\t42 total';
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe('wc for error handling', function() {
    it('should return error when the options given are invalid', function() {
      actualOutput = wc(['-asdwlc', 'alphabets'], fs);
      expectedOutput = 'wc: illegal option -- a\nusage: wc [-clmw] [file...]';
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
