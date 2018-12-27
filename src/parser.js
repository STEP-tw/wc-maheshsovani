const DASH = "-";
const EMPTYSTR = "";
const isStartWithDash = function(option) {
  return option.startsWith(DASH);
};

const notStartsWithDash = function(option) {
  return !option.startsWith(DASH);
};

const removeDash = function(options) {
  return options.map(option => option.slice(1)).join("");
};

const parser = function(details) {
  let defaultOption = "lwc";
  let extractedOptions = details.filter(isStartWithDash);
  let options = removeDash(extractedOptions) || defaultOption;
  let files = details.filter(notStartsWithDash);
  return { options, files };
};

module.exports = { parser };
