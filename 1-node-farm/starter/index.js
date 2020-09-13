// const fs = require("fs");

/* Sync/Blocking Code */

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // synchronus file reading - blocking code
// console.log(textIn);

// const textOut = `This is what we know about avos: ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file written");

/* Synchronous code is problematic as it is blocking.  Node JS is single threaded - only one process
running at a time.*/

/* Non-blocking, Async Code */
/* 
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
            console.log(data3);
            
            fs.writeFile('.txt/final.txt', `${data2} \n ${data3}`, 'utf-8', (err) => {
                console.log('file has been written.')
            })
        });
    });
});


console.log("will read file");  // gets executed first
*/
///////////////////////////////////////////////////////////////////////////////

// Creating a simple web server

const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  // createServer module fires a callback function
  //  with params REQUEST and RESPONSE
  console.log(req);
  res.end("Hello from server!");
});

// listen takes in params PORT and HOST (usually localhost)
server.listen(3000, "127.0.0.1", () => {
  console.log("listening on port 3000");
});
