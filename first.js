const minimist = require('minimist')

exports.help = minimist(process.argv.slice(2), {
    string: ['size'],
    boolean: true,
    alias: {'help': 'h'},
    default: {'help': true},
    unknown: (arg) => {
        console.error('Unknown option: ', arg);
        return false
    }
});

exports.newArg = minimist(process.argv.slice(2), {
    default: {
        databaseUrl: 'localhost:3306',
        password: 'some pass'
    }

});


