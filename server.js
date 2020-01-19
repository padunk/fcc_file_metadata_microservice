'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const upload = multer().single('upfile');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
   res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
   upload(req, res, err => {
      if (err instanceof multer.MulterError) {
         console.log('Muter error when uploading.');
         console.error(err);
         res.end();
         return;
      } else if (err) {
         console.log('Unknown error when uploading.');
         console.error(err);
         res.end();
         return;
      }
      console.log(req.file);
      let { originalname: name, size, mimetype: type } = req.file;
      let output = {
         name,
         type,
         size,
      };
      res.json(output);
      res.end();
   });
});

app.listen(process.env.PORT || 3000, function() {
   console.log('Node.js listening ...');
});
