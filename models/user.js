const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const confidential = require('./../config/confidential.js');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: { unique: true }
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving.
UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        this.password = await bcrypt.hash(this.password, confidential.BCRYPT_SALT_ROUNDS);
        
        next();    
    } catch (error) {
        next(error);
    }
});

UserSchema.methods = {
    async isAuthentic(password) {
        return await bcrypt.compare(password, this.password);
    },

    getDisplayName() {
        return this.firstName + ' ' + this.lastName;
    }
};

module.exports = mongoose.model('User', UserSchema);