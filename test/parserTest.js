const assert = require('assert');
const { parser } = require('../src/parser.js');

describe("parser", function() {
  it("should return files when no option is given", function() {
    actualOutput = parser(["numbers"]);
    expectedOutput = {file :"numbers"};
    assert.deepEqual(actualOutput,expectedOutput);
  });

  it("should return option and files when valid option is given", function() {
    actualOutput = parser(["-l","numbers"]);
    expectedOutput = {option : "l" , file :"numbers"};
    assert.deepEqual(actualOutput,expectedOutput);
  });
});