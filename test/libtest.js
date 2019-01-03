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
      actualOutput = wc({ files: ['numbers'], options: ['l', 'w', 'c'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it('should return the number of lines, words and bytes when one line file is given', function() {
      expectedOutput = '0\t1\t6 oneLineFile';
      actualOutput = wc(
        { files: ['oneLineFile'], options: ['l', 'w', 'c'] },
        fs
      );
      assert.equal(expectedOutput, actualOutput);
    });
    it('should return zero for all parameters when input file is empty', function() {
      expectedOutput = '0\t0\t0 emptyFile';
      actualOutput = wc({ files: ['emptyFile'], options: ['l', 'w', 'c'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines when -l option is given', function() {
      expectedOutput = '9 numbers';
      actualOutput = wc({ files: ['numbers'], options: ['l'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of bytes when -c option is given', function() {
      expectedOutput = '19 numbers';
      actualOutput = wc({ options: ['c'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of words when -w option is given', function() {
      expectedOutput = '10 numbers';
      actualOutput = wc({ options: ['w'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });
  });
  describe('multiple option test cases', function() {
    it('should return the number of lines and words when one file is given with -l and -w option is given', function() {
      expectedOutput = '9\t10 numbers';
      actualOutput = wc({ options: ['l', 'w'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it('should return the number of lines, words when one line file is given', function() {
      expectedOutput = '0\t1 oneLineFile';
      actualOutput = wc({ options: ['w', 'l'], files: ['oneLineFile'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });
    it('should return zero for lines and bytes count when input file is empty', function() {
      expectedOutput = '0\t0 emptyFile';
      actualOutput = wc({ options: ['l', 'c'], files: ['emptyFile'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return zero for lines and bytes count when input file is empty', function() {
      expectedOutput = '9\t19 numbers';
      actualOutput = wc({ options: ['c', 'l'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of bytes and words when -c and -w options are given', function() {
      expectedOutput = '10\t19 numbers';
      actualOutput = wc({ options: ['c', 'w'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of bytes and words when  -c -w options are given', function() {
      expectedOutput = '10\t19 numbers';
      actualOutput = wc({ options: ['w', 'c'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc({ options: ['w', 'c', 'l'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc({ options: ['c', 'w', 'l'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc({ options: ['w', 'l', 'c'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc({ options: ['c', 'l', 'w'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc({ options: ['l', 'w', 'c'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });

    it('should return number of lines , words, and bytes when all options are given by maintaining fixed sequence', function() {
      expectedOutput = '9\t10\t19 numbers';
      actualOutput = wc({ options: ['l', 'c', 'w'], files: ['numbers'] }, fs);
      assert.equal(expectedOutput, actualOutput);
    });
  });

  describe('multiple files', function() {
    it('should return content of multiple files with total if "lcw" is specified as option', function() {
      actualOutput = wc(
        { options: ['l', 'c', 'w'], files: ['numbers', 'alphabets'] },
        fs
      );
      expectedOutput =
        '9\t10\t19 numbers\n5\t6\t17 alphabets\n14\t16\t36 total';
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return content of multiple files with total if "clw" is specified as option"', function() {
      actualOutput = wc(
        { options: ['c', 'l', 'w'], files: ['numbers', 'alphabets'] },
        fs
      );
      expectedOutput =
        '9\t10\t19 numbers\n5\t6\t17 alphabets\n14\t16\t36 total';
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return content of multiple files with total if "wlc" is specified as option"', function() {
      actualOutput = wc(
        { options: ['w', 'l', 'c'], files: ['numbers', 'alphabets'] },
        fs
      );
      expectedOutput =
        '9\t10\t19 numbers\n5\t6\t17 alphabets\n14\t16\t36 total';
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return the lines,bytes and words count along with total of them for multiple files', function() {
      actualOutput = wc(
        {
          options: ['w', 'l', 'c'],
          files: ['alphabets', 'numbers', 'oneLineFile']
        },
        fs
      );
      expectedOutput =
        '5\t6\t17 alphabets\n9\t10\t19 numbers\n0\t1\t6 oneLineFile\n14\t17\t42 total';
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
