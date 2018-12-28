const DASH = "-";

const notStartsWithDash = function(option) {
  return !option.startsWith(DASH);
};

const parser = function(details) {
  let defaultOption = "-lwc";
  let startingIndex = details.findIndex(notStartsWithDash);
  if (startingIndex < 0) startingIndex = details.length;
  let options = details.slice(0, startingIndex).join("") || defaultOption;
  let files = details.slice(startingIndex);
  return { options, files };
};

module.exports = { parser };
