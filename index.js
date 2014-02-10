(function(exports){
  //var owaspPassStrength = {};
  exports.config = {
    minLength    : 10,
    maxLength    : 128,
    phraseLength : 20,
  };

  // your code goes here
  exports.test = function(password){
    // result 
    var result = {
      strong: true,
      errors: [],
    };

    // minimum length
    if (password.length < exports.config.minimumLength) {
      result.strong = false;
      result.errors.push('The password must be at least ' + exports.config.minLength + ' characters long.');
    }

    // maximum length
    if (password.length > exports.config.maximumLength) {
      result.strong = false;
      result.errors.push('The password must be fewer than ' + exports.config.maxLength + ' characters.');
    }

    // if a passphrase is longer than 20 characters, exempt it from the remaining
    // complexity rules
    if (password.length < exports.config.phraseLength) {

      // @todo: ideally, we only need to pass some of these. Configurable.

      // require at least one lowercase letter
      if (!/[a-z]/.test(password)) {
        result.strong = false;
        result.errors.push('The password must contain at least one lowercase letter.');
      }
      
      // require at least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        result.strong = false;
        result.errors.push('The password must contain at least one uppercase letter.');
      }
      
      // require at least one number
      if (!/[0-9]/.test(password)) {
        result.strong = false;
        result.errors.push('The password must contain at least one number.');
      }
      
      // require at least one special character
      if (!/[^A-Za-z0-9 ]/.test(password)) {
        result.strong = false;
        result.errors.push('The password must contain at least one special character.');
      }
      
      // forbid repeating characters
      if (/(.)\1{2,}/.test(password)) {
        result.strong = false;
        result.errors.push('The password may not contain sequences of three or more repeated characters.');
      }
    }

    // return the result
    return result;
  };

})(typeof exports === 'undefined' ? this['owaspPassStrength'] = {} : exports );
