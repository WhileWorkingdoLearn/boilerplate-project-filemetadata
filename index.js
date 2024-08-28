var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');

require('dotenv').config()

var app = express();
const upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // If valid file was uploaded, file data is on req.file:
  if (!req.file) {
    return res.json({ error: 'Please upload a file' });
  }

  const { originalname: name, mimetype: type, size } = req.file;
  console.log(req.file);
  return res.json({ name, type, size });
});



const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
