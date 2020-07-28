var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    username: {type: String, required: true, maxlength: 30},
    body: {type: String, required: true, maxlength: 5000},
    datetime_of_post: {type: Date, required: true}
  }
);

module.exports = mongoose.model('Message', MessageSchema);