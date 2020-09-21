const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution 1 - node has to load entire file into memory - problematic
  //  when file is large or many users are trying to access it
  /* fs.readFile('test-file.txt', (err,data) => {
        if (err) {
            console.log(err)
        } else {
            res.end(data)
        }
    }) */

  // Solution 2 - Streams - we are streaming the file using the write function
  /* const readable = fs.createReadStream('test-file.txt');
  readable.on('data', (chunk) => {
    res.write(chunk);
  });
  // must use end part, otherwise the respoonse will never end to client.
  readable.on('end', () => {
    res.end();
  });
  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found');
    }); */
  // solution 3 - piping
  const readable = fs.createReadStream('test-file.txt');
  // readableSource.pipe(writableDest)
  readable.pipe(res);
});

// backpressure - when the server can't send data as fast as it is reading it from file.
server.listen(8000, () => {
  console.log('Listening on port 8000...');
});
