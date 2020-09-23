const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

/* -------------------------------------------------------------------- */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get(`/api/v1/tours`, (req, res) => {
  res.status(200).json({ // wrapping the JSON response in another JSON
    status: 'success',
    results: tours.length,
    data: {
      tours: tours, // JSON data
    },
  });
});

app.post('/api/v1/tours', (req,res) => {
  console.log(req.body)
  res.send('You can post to this endpoint...')
})

/* -------------------------------------------------------------------- */
const port = 2000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
