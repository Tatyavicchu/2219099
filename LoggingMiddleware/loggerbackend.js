const axios = require('axios');
let token = '';
function setToken(t) { token = t; }
function log(stack, level, pkg, message) {
  axios.post('http://20.244.56.144/evaluation-service/logs',
    { stack, level, package: pkg, mssg: message },
    { headers: { Authorization: `Bearer ${token}` } });
}
module.exports = { setToken, log };
