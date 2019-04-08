//====== settings
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;

//====== konfigurasi database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hiso');

//====== konfigurasi bodyParser
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

router.get('/', function(req, res) {
	res.json({ message:"dalam halaman home" });
});

//====== set prefix
app.use('/api', router);

app.listen(port);
