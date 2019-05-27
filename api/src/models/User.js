const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    },
    victories: {
        type: Number,
        default: 0
    }
});

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    });

    if (!user) {
        user = await this.findOne({ email: login });
    }

    return user;
};

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');
