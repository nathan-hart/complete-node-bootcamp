const fs = require('fs');
const superagent = require('superagent');

// This function resolves a promise!
// Promises solution:

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I couldnt find file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write file');
      resolve('success');
    });
  });
};
/* 
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed name: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message).then(() => {
    });
  })
  .catch((err) => {
    console.log(err);
  });
  */

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed name: ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog saved to file!!!');
  } catch (err) {
    console.log(err);
  }
};
getDogPic();
