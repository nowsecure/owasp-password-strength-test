var owasp = require('./index');

owasp.config.maxLength = 3;

//console.log(owasp);

console.log(owasp.test('how is this'));
