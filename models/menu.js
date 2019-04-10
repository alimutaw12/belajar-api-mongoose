var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
	name : String,
	price : Number,
});

var collection = 'menu';

module.exports = mongoose.model('Menu', menuSchema, collection);
