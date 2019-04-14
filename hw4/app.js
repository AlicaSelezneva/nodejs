const http = require('http');
const fs = require('fs');
const readChunk = require('read-chunk');
const queryString = require('querystring');
const url = require('url');
const path = require('path');
const fileType = require('file-type');
const formidable = require('formidable');
const util = require('util');


const {writeLog, writeRequests} = require('./writeLog.js');
const ContentTypes = [
    "application/x-www-form-urlencoded",
    "application/json",
    "image/jpeg"
];
const port = 3000;
let log = {};
let requests = [];
let count = 0;

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const parsedUrlLength = parsedUrl.pathname.length;

    if (req.method === "GET") {
        if (req.url === "/") {

            const rs = fs.createReadStream(path.join(__dirname, "index.html"));
            rs.pipe(res);

        } else {

            let filesList;
            fs.readdir(path.join(__dirname), function (err, files) {
                filesList = files.filter(function (e) {
                    return path.extname(e).toLowerCase() === req.url.replace('/', '.');
                });

                if (filesList !== undefined) {
                    const read = fs.createReadStream(`${path.join(__dirname)}/${filesList[0]}`, {
                        highWaterMark: 70 * 1024 * 1024
                    });

                    const buffer = readChunk.sync(`${path.join(__dirname)}/${filesList[0]}`, 0, fileType.minimumBytes);
                    const mime = fileType(buffer).mime;
                    res.writeHead(200, {
                        "Content-Type": `${mime}`,
                        "Content-Disposition": `attachment; filename = ${filesList[0]}`,
                    });

                    read.on('data', async () => {
                        log.file = filesList[0];
                        log.uploaded = new Date();
                        log.startTime = new Date().getTime();

                    });
                    read.on('end', async () => {
                        log.endTime = new Date().getTime();

                    });

                    read.on('error', async (err) => {
                        log.condition = err;

                    });


                    read.pipe(res);

                    setTimeout(() => {
                        writeLog(log)
                    }, 1000)


                }

            });
        }
    }
    else if(req.method === "POST"){
        if (req.url === "/downloadFile"){
            console.log(req)
            let body = '';
            let filePath = path.join(__dirname,'ololo.jpg') ;
            req.on('data', (data)=> {
                body += data;
            });

            req.on('end', function (){
                fs.appendFile(filePath, body, ()=> {
                    res.end();
                });
            });

            // let form = new formidable.IncomingForm();
            // form.parse(req, function(err, fields, files) {
            //     res.writeHead(200, {'content-type': 'text/plain'});
            //     res.write('received upload:\n\n');
            //     res.end(util.inspect({fields: fields, files: files}));
            // });

        }

    }

        let countReq = {
            number: ++count,
            statusCode: res.statusCode,
            userAgent: req.headers["user-agent"],
        };
        requests.push(countReq);


    setInterval(() => {
        if(requests.length > 0){
            let cleanArr = writeRequests(requests);
            if(cleanArr) requests = [];
        }

    }, 1000);
   }

);


server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
