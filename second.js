const colors = require('colors');
const processenv = require('processenv');

function checkOs() {
    if (processenv('OS') === 'Windows_NT') {
        return colors.red(processenv('OS'))
    } else {
        return colors.blue(processenv('OS'))
    }
}

module.exports = {
    checkOs,
};

