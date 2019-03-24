const processenv = require('processenv');

function setPort(port) {
    return processenv('PORT', port);
}

function setUser(user) {
    return processenv('USER', user);
}


module.exports =
{
    setPort,
    setUser
}
