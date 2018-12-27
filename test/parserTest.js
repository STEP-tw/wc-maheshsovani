const assert = require("assert");
const { parser } = require("../src/parser.js");

describe("parser", function() {
  it("should return files when no option is given", function() {
    actualOutput = parser(["numbers"]);
    expectedOutput = { files: ["numbers"], options: "lwc" };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return option and files when only one option is given", function() {
    actualOutput = parser(["-l", "numbers"]);
    expectedOutput = { options: "l", files: ["numbers"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return option and files when two options are given seperately", function() {
    actualOutput = parser(["-l", "-w", "numbers"]);
    expectedOutput = { options: "lw", files: ["numbers"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return option and files when two options are given combined", function() {
    actualOutput = parser(["-lw", "numbers"]);
    expectedOutput = { options: "lw", files: ["numbers"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return option and files when three options are given seperately", function() {
    actualOutput = parser(["-l", "-w", "-c", "numbers"]);
    expectedOutput = { options: "lwc", files: ["numbers"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return option and files when three options are given combined", function() {
    actualOutput = parser(["-lwc", "numbers"]);
    expectedOutput = { options: "lwc", files: ["numbers"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
