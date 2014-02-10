should = require 'should'
owasp  = require './owasp-password-strength-test'


describe 'passwords:', ->

  describe 'required tests:', ->
    it 'minLength should be enforced', ->
      result = owasp.test( 'L0^eSex')
      result.strong.should.be.false
      result.errors.should.have.length 1

    it 'maxLength should be enforced', ->
      password = ''
      password += 'abc' for x in [1..50]
      result = owasp.test(password)
      result.strong.should.be.false
      result.errors.should.have.length 1

    it 'repeating characters (3 times or more) should be forbidden', ->
      result = owasp.test('L0veSexxxSecre+God')
      result.strong.should.be.false
      result.errors.should.have.length 1

  describe 'optional tests:', ->
    it 'valid passwords should be recognized as such', ->
      result = owasp.test('L0veSexSecre+God')
      result.strong.should.be.true
      result.errors.should.be.empty

    it 'at least one lowercase character should be required', ->
      result = owasp.test('L0VESEXSECRE+GOD')
      result.strong.should.be.false
      result.errors.should.have.length 1

    it 'at least one uppercase character should be required', ->
      result = owasp.test('l0vesexsecre+god')
      result.strong.should.be.false
      result.errors.should.have.length 1

    it 'at least one number should be required', ->
      result = owasp.test('LoveSexSecre+God')
      result.strong.should.be.false
      result.errors.should.have.length 1

    it 'at least one special character should be required', ->
      result = owasp.test('L0veSexSecretGod')
      result.strong.should.be.false
      result.errors.should.have.length 1


describe 'passphrases:', ->
  it 'should not be subject to optional tests by default', ->
    result = owasp.test('Hack the planet! Hack the planet!')
    result.strong.should.be.true
    result.errors.should.be.empty

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
