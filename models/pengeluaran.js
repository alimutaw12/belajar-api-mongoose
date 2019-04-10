var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pengeluaranSchema = new Schema({
	name : String,
	price : Number,
	category_id : [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

var collection = 'pengeluaran';

module.exports = mongoose.model('Pengeluaran', pengeluaranSchema, collection);
