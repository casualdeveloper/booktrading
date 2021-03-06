const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    profile: {
        firstName: { type: String },
        lastName: { type: String },
        country: {
            full: {type: String},
            short: {type: String }
        },
        state: {
            full: {type: String},
            short: {type: String }
        },
        city: { type: String }
    },
    books: [{ type: Schema.ObjectId, ref: "Book" }],
});

userSchema.methods.name = function() {
    if(this.profile.firstName && this.profile.lastName)
        return this.profile.firstName + " " + this.profile.lastName;
    return this.username;
};

const noop = function() {};
userSchema.pre("save", function(done) {
    const user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

const User = mongoose.model("User", userSchema);
module.exports = User;