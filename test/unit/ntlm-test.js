/* @flow */

const assert = require('chai').assert;

const NTLMAuthProvider = require('../../src').NTLMAuthProvider;

describe('NTLMAuthProvider', function() {
  describe('.handshake', function() {
    describe('without input data', function() {
      it('generates a NTLM NEGOTIATE_MESSAGE message', function(done) {
        const authProvider = new NTLMAuthProvider(null, {});

        const expectedBuffer = new Buffer([
          // Signature
          '4e544c4d53535000',

          // MessageType
          '01000000',

          // NegotiateFlags
          '078208a0',

          // DomainNameFields
          '0000000028000000',

          // WorkstationFields
          '0000000028000000',

          // Version
          '00000000',

          // Other
          '0000000f'
        ].join(''), 'hex');

        authProvider.handshake(null, function(error, data) {
          if (error) {
            return done(error);
          }

          assert(Buffer.isBuffer(data));

          if (data) {
            assert.strictEqual(data.length, 40);
            assert.deepEqual(data, expectedBuffer);
          }

          done();
        });
      });

      it('generates a NTLM NEGOTIATE_MESSAGE with a workstation name', function(done) {
        const authProvider = new NTLMAuthProvider(null, {
          workstation: 'WORKSTATION'
        });

        const expectedBuffer = new Buffer([
          // Signature
          '4e544c4d53535000',

          // MessageType
          '01000000',

          // NegotiateFlags
          '07a208a0',

          // DomainNameFields
          '0000000033000000',

          // WorkstationFields
          '0b000b0028000000',

          // Version
          '00000000',

          // Other
          '0000000f',

          // -- Payload

          // WorkstationName
          '574f524b53544154494f4e'
        ].join(''), 'hex');

        authProvider.handshake(null, function(error, data) {
          if (error) {
            return done(error);
          }

          assert(data);

          if (data) {
            assert.ok(Buffer.isBuffer(data));
            assert.strictEqual(data.length, 51);
            assert.deepEqual(data, expectedBuffer);
          }

          done();
        });
      });

      it('generates a NTLM NEGOTIATE_MESSAGE with a domain name', function(done) {
        const authProvider = new NTLMAuthProvider(null, {
          domain: 'DOMAIN'
        });

        const expectedBuffer = new Buffer([
          // Signature
          '4e544c4d53535000',

          // MessageType
          '01000000',

          // NegotiateFlags
          '079208a0',

          // DomainNameFields
          '0600060028000000',

          // WorkstationFields
          '0000000028000000',

          // Version
          '00000000',

          // Other
          '0000000f',

          // -- Payload

          // DomainName
          '444f4d41494e'
        ].join(''), 'hex');

        authProvider.handshake(null, function(error, data) {
          if (error) {
            return done(error);
          }

          assert(Buffer.isBuffer(data));

          if (data) {
            assert.strictEqual(data.length, 46);
            assert.deepEqual(data, expectedBuffer);
          }

          done();
        });
      });

      it('generates a NTLM NEGOTIATE_MESSAGE with a workstation and a domain name', function(done) {
        const authProvider = new NTLMAuthProvider(null, {
          workstation: 'WORKSTATION',
          domain: 'DOMAIN'
        });

        const expectedBuffer = new Buffer([
          // Signature
          '4e544c4d53535000',

          // MessageType
          '01000000',

          // NegotiateFlags
          '07b208a0',

          // DomainNameFields
          '0600060033000000',

          // WorkstationFields
          '0b000b0028000000',

          // Version
          '00000000',

          // Other
          '0000000f',

          // -- Payload

          // WorkstationName
          '574f524b53544154494f4e',

          // DomainName
          '444f4d41494e'
        ].join(''), 'hex');

        authProvider.handshake(null, function(error, data) {
          if (error) {
            return done(error);
          }

          assert(Buffer.isBuffer(data));

          if (data) {
            assert.strictEqual(data.length, 57);
            assert.deepEqual(data, expectedBuffer);
          }

          done();
        });
      });
    });
  });
});
