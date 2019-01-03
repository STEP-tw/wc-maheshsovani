/* eslint-env mocha */

const assert = require('assert');
const { parser } = require('../src/parser.js');

describe('parser', function() {
  let expectedOutput;
  let actualOutput;
  it('should return files when no option is given', function() {
    actualOutput = parser(['numbers']);
    expectedOutput = {
      files: ['numbers'],
      options: ['l', 'w', 'c'],
      error: false
    };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return option and files when only one option is given', function() {
    actualOutput = parser(['-l', 'numbers']);
    expectedOutput = { options: ['l'], files: ['numbers'], error: false };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return option and files when two options are given seperately', function() {
    actualOutput = parser(['-l', '-w', 'numbers']);
    expectedOutput = { options: ['l', 'w'], files: ['numbers'], error: false };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return option and files when two options are given combined', function() {
    actualOutput = parser(['-lw', 'numbers']);
    expectedOutput = { options: ['l', 'w'], files: ['numbers'], error: false };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return option and files when three options are given seperately', function() {
    actualOutput = parser(['-l', '-w', '-c', 'numbers']);
    expectedOutput = {
      options: ['l', 'w', 'c'],
      files: ['numbers'],
      error: false
    };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return option and files when three options are given combined', function() {
    actualOutput = parser(['-lwc', 'numbers']);
    expectedOutput = {
      options: ['l', 'w', 'c'],
      files: ['numbers'],
      error: false
    };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return illegal option error when illegal option are given', function() {
    actualOutput = parser(['-asdlwc', 'numbers']);
    expectedOutput = {
      options: ['a', 's', 'd', 'l', 'w', 'c'],
      files: ['numbers'],
      error: 'wc: illegal option -- a\nusage: wc [-clmw] [file...]'
    };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return empty array for files when only options are given with error', function() {
    actualOutput = parser(['-asdlwc']);
    expectedOutput = {
      options: ['a', 's', 'd', 'l', 'w', 'c'],
      files: [],
      error: 'wc: illegal option -- a\nusage: wc [-clmw] [file...]'
    };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return empty array for files when only options are given and errro as false', function() {
    actualOutput = parser(['-lwc']);
    expectedOutput = {
      options: ['l', 'w', 'c'],
      files: [],
      error: false
    };
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
