const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, 'log.txt');
const requestPath = path.join(__dirname, 'requestLog.txt');

function writeLog(log) {
    return new Promise(function (resolve, reject) {

        log.spentTime = Number(log.endTime) - Number(log.startTime);

        fs.open(logPath, 'a', function (err, fd) {
            if (err) throw 'could not open file: ' + err;
            fs.appendFile(fd, `${JSON.stringify(log)}\n`, 'utf8', (err) => {
                fs.close(fd, (err) => {
                    if (err) throw err;
                });
                if (err) throw err;
            });
        });
        resolve();
     })
}

function writeRequests(data){
    return new Promise(resolve=>{
        fs.open(requestPath, 'a', function (err, fd) {
            if (err) throw 'could not open file: ' + err;
            fs.appendFile(fd, `${JSON.stringify(data,'\n',2)}\n`, 'utf8', (err) => {
                fs.close(fd, (err) => {
                    if (err) throw err;
                });
                if (err) throw err;
            });
        });
        resolve();
    })

// fs.writeFile()
}


module.exports = {
    writeLog,
    writeRequests
};

