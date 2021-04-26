
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const userSchema = mongoose.Schema({
    username: {type: String, uninque: true},
    fullname: {type: String, uninque: true, default: ''},
    email: {type: String, uninque: true},
    password: {type: String, default: ''},
    userImage: {type: String, default: 'default.png'},
    facebook: {type: String, default: ''},
    fbTokens: Array,
    google: {type: String, default: ''},
    googleToken: Array,
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validUserPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', userSchema);