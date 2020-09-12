const fs = require("fs");

/* Sync/Blocking Code */
const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // synchronus file reading - blocking code
console.log(textIn);

const textOut = `This is what we know about avos: ${textIn}\n Created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("file written");

// Synchronous code is problematic as it is blocking.  Node JS is single threaded - only one process
//  running at a time.

/* Non-blocking, Async Code */

fs.readFile("./txt/start.txt", 'utf-8', (err, data) => {
    console.log(data);
});
