const fs = require('fs');
const superagent = require('superagent');

// Callback HELL!!!!!

// First function
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed name: ${data}`);
  // Second function - nested
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res.body.message);
      // Third function - even more nested
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) {
          console.log(err);
        
          return;
        }
        console.log("Random dog image save to file!")
      });
    });
});
