const axios = require('axios');
let token = '';
function setToken(tk) {
  token=tk;
}
function log(stack, level, pkg, message) {
    axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`Logged: ${message}`);
}
module.exports = { setToken, log };
