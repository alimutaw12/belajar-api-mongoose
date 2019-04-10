var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transaksiSchema = new Schema({
	price : Number,
	start : {type:Date, default:Date.now},
});

var menuSchema = new Schema({
	name : String,
	price : Number,
});

var transaksiLineSchema = new Schema({
	quantity : Number,
	menu : menuSchema,
	transaksi : transaksiSchema
});

var collection = 'transaksi_line';

module.exports = mongoose.model('TransaksiLine', transaksiLineSchema, collection);
