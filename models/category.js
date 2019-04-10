var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	name : String,
});

var collection = 'kategori_pengeluaran';

module.exports = mongoose.model('Category', categorySchema, collection);
