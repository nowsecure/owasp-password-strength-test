should = require 'should'
owasp  = require './owasp-password-strength-test'


describe 'passwords:', ->

  describe 'required tests:', ->
    it 'minLength should be enforced', ->
      owasp.test( 'small').strong.should.be.false

    it 'maxLength should be enforced', ->
      password = ''
      password += 'a' for x in [1..200]
      owasp.test(password).strong.should.be.false

  describe 'optional tests:', ->
    owasp.config minOptionalTestsToPass: 5

    it 'valid passwords should be recognized as such', ->
      owasp.test('L0veSexSecre+God').strong.should.be.true

    it 'at least one lowercase character should be required', ->
      owasp.test('L0VESEXSECRE+GOD').strong.should.be.false

    it 'at least one uppercase character should be required', ->
      owasp.test('l0vesexsecre+god').strong.should.be.false

    it 'at least one number should be required', ->
      owasp.test('LoveSexSecre+God').strong.should.be.false

    it 'at least one special character should be required', ->
      owasp.test('L0veSexSecretGod').strong.should.be.false

    it 'repeating characters (3 times or more) should be forbidden', ->
      owasp.test('L0veSexxxSecre+God').strong.should.be.false


describe 'passphrases:', ->
  it 'should not be subject to optional tests by default', ->
    owasp.test('Hack the planet! Hack the planet!').strong.should.be.true

  it 'should be subject to optional tests per configuration', ->
    owasp.config allowPassphrases: false
    owasp.test('Hack the planet! Hack the planet!').strong.should.be.false


describe 'configs:', ->
  it 'should be settable', ->
    owasp.config(
      allowPassphrases       : false
      maxLength              : 5
      minLength              : 5
      minPhraseLength        : 5
      minOptionalTestsToPass : 5
    )

    owasp.configs.allowPassphrases.should.be.false
    owasp.configs.maxLength.should.be.exactly 5
    owasp.configs.minLength.should.be.exactly 5
    owasp.configs.minPhraseLength.should.be.exactly 5
    owasp.configs.minOptionalTestsToPass.should.be.exactly 5

  it 'should reject invalid parameter keys', ->
    owasp.config foo: 'bar'
    owasp.configs.should.not.have.property 'foo'
