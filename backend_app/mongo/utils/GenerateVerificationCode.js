const GenerateVerificationCode = (numDigits) => {
  let code = "";
  for (let i = 0; i < numDigits; i++) {
    let digit = Math.floor(Math.random() * 9);
    code += digit;
  }
  return code;
};

module.exports = GenerateVerificationCode;
