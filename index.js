(function(exports) {

  // configuration settings
  exports.configs = {
    allowPassphrases : true,
    maxLength        : 128,
    minLength        : 10,
    minPhraseLength  : 20,
    minTestsToPass   : 5,
  };

  // method to set the configs
  exports.config = function(params) {
    for (var prop in params) {
      if (params.hasOwnProperty(prop)) {
        this.configs[prop] = params[prop];
      }
    }
  };


  exports.tests = {
    required: [
      // minimum length
      function(password) {
        if (password.length < exports.configs.minLength) {
          return 'The password must be at least ' + exports.configs.minLength + ' characters long.';
        }
      },
      
      // maximum length
      function(password) {
        if (password.length > exports.configs.maxLength) {
          return 'The password must be fewer than ' + exports.configs.maxLength + ' characters.';
        }
      }
    ],

    optional: [
      // require at least one lowercase letter
      function(password) {
        if (!/[a-z]/.test(password)) {
          return 'The password must contain at least one lowercase letter.';
        }
      },

      // require at least one uppercase letter
      function(password) {
        if (!/[A-Z]/.test(password)) {
          return 'The password must contain at least one uppercase letter.';
        }
      },

        // require at least one number
      function(password) {
        if (!/[0-9]/.test(password)) {
          return 'The password must contain at least one number.';
        }
      },

        // require at least one special character
      function(password) {
        if (!/[^A-Za-z0-9 ]/.test(password)) {
          return 'The password must contain at least one special character.';
        }
      },

        // forbid repeating characters
      function(password) {
        if (/(.)\1{2,}/.test(password)) {
          return 'The password may not contain sequences of three or more repeated characters.';
        }
      },
    ],
  };

  // your code goes here
  exports.test = function(password) {
    // result 
    var result = {
      strong      : true,
      errors      : [],
      testsPassed : 0,
    };

    // if a passphrase is longer than 20 characters, exempt it from the remaining
    // complexity rules
    if (this.configs.allowPassphrases && password.length < this.configs.minPhraseLength) {
      this.tests.optional.forEach(function(test) {
        var err = test(password, result);
        if (typeof err === 'string') {
          result.errors.push(err);
        } else {
          result.testsPassed++;
        }
      });
    }

    this.tests.required.forEach(function(strengthTest) {
      var err = strengthTest(password, result);
      if (typeof err === 'string') {
        result.strong = false;
        result.errors.push(err);
      }
    });

    if (result.testsPassed < this.configs.minTestsToPass) {
      result.strong = false;
    }

    // return the result
    return result;
  };
//})(typeof exports === 'undefined' ? this['owaspPassStrength'] = {} : exports );
})(typeof exports === 'undefined' ? window.owaspPassStrength = {} : exports );
