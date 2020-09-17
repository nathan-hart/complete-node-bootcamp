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
const { report } = require("process");
const url = require("url");

// IMPORTS
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplates");
// SERVER
// Code that is executed once at Server Setup can be SYNC

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  // createServer module fires a callback function
  //  with params REQUEST and RESPONSE
  const { query, pathname } = url.parse(req.url, true);
  // const pathname = req.url;

  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
    // Product Page
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    // 404 Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>This Page not found</h1>");
  }
});

// listen takes in params PORT and HOST (usually localhost)
server.listen(8000, "127.0.0.1", () => {
  console.log("listening on port 8000");
});
