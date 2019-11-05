var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moment = require('moment');

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

//Virtual for the author's full name
AuthorSchema
.virtual('name')
.get(function () {
    return this.family_name + ', ' + this.first_name;
});

//Virtual for the author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
    let birth = this.date_of_birth ? moment(this.date_of_birth).format('Y') : '';
    let death = this.date_of_death ? moment(this.date_of_death).format('Y') : '';
    return (birth + '-' + death);
});

//Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
    return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);