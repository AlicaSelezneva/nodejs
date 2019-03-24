const {help, newArg} = require('./first.js');
const {checkOs} = require('./second.js');
const {setPort, setUser} = require('./third.js');

console.log(setPort(3000), setUser('Tonya'))
console.log(help, newArg);
console.log(checkOs());
