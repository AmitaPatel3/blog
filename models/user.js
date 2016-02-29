var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model		//going to create an object called local--known as an authentication strategy
var userSchema = mongoose.Schema({
    local            : {						//local strategy--letting someone sign up with email and password/to dive deeper==you can have them sign them up with facebook/twitter
        email        : String,
        password     : String,
        username     : String,
        role         : String,
        loggedIn     : Boolean
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); //hashmaking function that will decyrypt and encrypt the password
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
