const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Makes the name field mandatory
        trim: true       // Trims the whitespace from the beginning and end of the string
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Converts the email to lowercase
        unique: true,    // Ensures that each email in the database is unique
        validate: {
            validator: function(v) {
                // Regular expression to validate the email
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!` // Custom message for validation failure
        }
    },
    planet: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets to the current date and time
    }
});

// Compile and export the model
module.exports = mongoose.model('User', userSchema);
