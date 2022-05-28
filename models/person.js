'use strict'

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var PersonSchema = Schema({
	name: String,
    lastName: String,
    age: Number
});

PersonSchema.plugin(mongoosePaginate);

//module.exports = mongoose.model('Person', PersonSchema);
module.exports = mongoose.model('persons', PersonSchema);