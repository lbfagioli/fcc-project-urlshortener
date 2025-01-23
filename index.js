require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urls = [{ original: 'http://example.com/', short: 1 }];
let count = 1;

app.post('/api/shorturl', (req, res) => {
  if (/^https?:\/\/[a-zA-Z\.]+/.test(req.body.url)) {
    urls.push({ original: req.body.url, short: ++count });
    res.json({ original_url : req.body.url, short_url : count });
  } else {
    res.json({ error: "Invalid URL" });
  }
});

app.get('/api/shorturl/:shorter', (req, res) => res.redirect(urls[req.params.shorter-1].original));

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
