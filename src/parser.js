const isValidOption = function(option){
  return ["-l","-c","-w"].includes(option);
}

const parser = function (details){
if (isValidOption(details[0])){
  return { option : details[0][1] , file : details[1] }
}

return {file : details[0]};
}
module.exports = { parser }; 