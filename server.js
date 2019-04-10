//====== settings
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;

//====== konfigurasi database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hiso');

var Category = require('./models/category');
var Pengeluaran = require('./models/pengeluaran');
var Menu = require('./models/menu');
var Transaksi = require('./models/transaksi');
var TransaksiLine = require('./models/transaksiLine');

//====== konfigurasi bodyParser
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

router.get('/', function(req, res) {
	res.json({ message:"dalam halaman home" });
});

router.get('/kategori-pengeluaran', function(req, res) {
	Category.find( function(err, category) {
		if (err) res.send(err);
		res.json(category);
	});
});

router.post('/kategori-pengeluaran', function(req, res) {
	var category = new Category();
	category.name = req.body.name;
	category.save(function(err) {
		if (err) res.send(err);
		res.json({ message:"kategori pengeluaran berhasil dimasukan" });
	});
});

router.post('/pengeluaran', function(req, res) {
	var pengeluaran = new Pengeluaran();
	pengeluaran.name = req.body.name;
	pengeluaran.price = req.body.price;
	pengeluaran.category_id = req.body.category_id;
	pengeluaran.save(function(err) {
		if (err) res.send(err);
		res.json({ message:"pengeluaran berhasil dimasukan" });
	});
});

router.post('/menu', function(req, res) {
	var menu = new Menu();
	menu.name = req.body.name;
	menu.price = req.body.price;
	menu.save(function(err) {
		if (err) res.send(err);
		res.json({ message:"menu berhasil dimasukan" });
	});
});

router.get('/menu', function(req, res) {
	Menu.find({}).populate('transaksi').exec(function(err, menu) {
		if (err) res.send(err);
		res.json(menu);
	});
});

router.get('/pengeluaran', function(req, res) {
	Pengeluaran.find({}).populate('category_id').exec(function(err, pengeluaran) {
		if (err) res.send(err);
		res.json(pengeluaran);
	});
});

router.post('/transaksi', function(req, res) {
	var max = 5;
	var min = -5;
	random = Math.floor(Math.random() * (max - min) + min);

	var transaksi = new Transaksi();
	transaksi.price = req.body.price;
	transaksi.temperature = 28 + random;
	transaksi.save(function(err) {
		if (err) res.send(err);
	});

	req.body.list.forEach(function(el) {
		var transaksiLine = new TransaksiLine();
		transaksiLine.transaksi = transaksi;
		transaksiLine.quantity = el.quantity;
		// console.log(transaksiLine);
		Menu.findById(el.id, function(err, menu) {
			console.log(menu);
			transaksiLine.menu = menu;
			transaksiLine.save(function(err) {
				if (err) res.send(err);
			});
		});
	});
	res.json({ message:"transaksi berhasil dimasukan" });
});

router.get('/transaksi', function(req, res) {
	Transaksi.find({}).exec(function(err, transaksi) {
		if (err) res.send(err);
		res.json(transaksi);
	});
});

router.get('/transaksi-menu/:idTransaksi', function(req, res) {
	Transaksi.findById(req.params.idTransaksi, function(err, transaksi) {
		if (err) res.send(err);
		TransaksiLine.find({transaksi:transaksi}, function(err, transaksiLine) {
			if (err) res.send(err);
			res.json(transaksiLine);
		});
	});
});

router.get('/menu-transaksi/:idMenu', function(req, res) {
	Menu.findById(req.params.idMenu, function(err, menu) {
		if (err) res.send(err);
		TransaksiLine.find({menu:menu}, function(err, transaksiLine) {
			if (err) res.send(err);
			res.json(transaksiLine);
		});
	});
});

router.post('/coba', function(req, res) {
	var max = 5;
	var min = -5;
	x = Math.floor(Math.random() * (max - min) + min);
	res.json(x);
});

//====== set prefix
app.use('/api', router);

app.listen(port);
console.log("berjalan pada port : " + port);
