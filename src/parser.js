const DASH = "-";
const isStartWithDash = function(option) {
  return option.startsWith(DASH);
};

const notStartsWithDash = function(option) {
  return !option.startsWith(DASH);
};

const removeDash = function(optionCandidates) {
  let options = optionCandidates
    .join("")
    .split("")
    .filter(notStartsWithDash)
    .join("");

  return options;
};
const parser = function(details) {
  let defaultOption = "lwc";
  let extractedOptions = details.filter(isStartWithDash);
  let options = removeDash(extractedOptions) || defaultOption;
  let files = details.filter(notStartsWithDash);
  return { options, files };
};

module.exports = { parser };
