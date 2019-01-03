const DASH = '-';

const notStartsWithDash = function(option) {
  return !option.startsWith(DASH);
};

const illegalOptionError = function(option) {
  return 'wc: illegal option -- ' + option + '\nusage: wc [-clmw] [file...]';
};

const isInvalidOption = function(option) {
  return !['l', 'c', 'w'].includes(option);
};

const extractOptions = function(options) {
  return options.map(option => option.slice(1));
};

const parser = function(details) {
  let error = false;
  let startingIndex = details.findIndex(notStartsWithDash);
  if (startingIndex < 0) startingIndex = details.length;
  let options = extractOptions(details.slice(0, startingIndex))
    .join('')
    .split('');
  let invalidOptionIndex = options.findIndex(isInvalidOption);
  let files = details.slice(startingIndex);
  if (invalidOptionIndex != -1)
    error = illegalOptionError(options[invalidOptionIndex]);

  if (options.length == 0) options = ['l', 'w', 'c'];
  return { options: options, files: files, error: error };
};

module.exports = { parser };
