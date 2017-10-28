// @flow

// const { Connection } = require('tedious');
// const ntlmAuthProvider = require('../../src');
//
// describe('Authenticating to SQLServer via NTLM', function() {
//   let workGroupConfig;
//
//   beforeEach(function() {
//     workGroupConfig = {
//       server: process.env.TDS_WORKGROUP_SERVER,
//
//       authProvider: ntlmAuthProvider({
//         domain: process.env.TDS_WORKGROUP_NAME,
//         username: process.env.TDS_WORKGROUP_USERNAME,
//         password: process.env.TDS_WORKGROUP_PASSWORD
//       })
//     };
//   });
//
//   it('works', function(done) {
//     const connection = new Connection(workGroupConfig);
//     connection.on('connect', function(err) {
//       if (err) {
//         return done(err);
//       }
//
//       connection.on('end', done);
//       connection.close();
//     });
//   });
// });
