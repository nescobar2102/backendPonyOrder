 const generator = require("generate-password");

  const generatorPassword = async () => {
    let password = false;
       password = generator.generate({
        length: 10,
        numbers: true,      
        symbols : true,
      });
    return password;
  };
  function isEmptyString (value) {
    return value == null || value.trim().length === 0;
  }
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  module.exports = {
    generatorPassword, 
    isEmptyString, 
    getRandomArbitrary,
  };
  