var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transaksiSchema = new Schema({
	price : Number,
	temperature : Number,
	start : {type:Date, default:Date.now},
});

var collection = 'transaksi';

module.exports = mongoose.model('Transaksi', transaksiSchema, collection);
