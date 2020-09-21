const express = require('express');

const app = express();

app.get('/', (req, res) => { // http method for when get method is sent to server
  res.status(200).json({ message: 'Hello from server side', app: 'Natours' });
});

app.post('/', (req,res) => {
    res.send('You can post to this endpoint...')
})

const port = 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}...`);
});
