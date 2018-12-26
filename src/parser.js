const isSartsWithDash = function (option){
  return option.startsWith('-');
}
const parser = function (details){
if (isSartsWithDash(details[0])){
  return { option : details[0][1] , file : details[1] }
}

return {file : details[0]};
}
module.exports = { parser }; 