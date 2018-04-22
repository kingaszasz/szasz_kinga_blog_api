const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
}, {timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
    maxAttempts: 5,
});

module.exports = mongoose.model('User', userSchema);