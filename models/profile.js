const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const ProfileSchema = new Schema({
    Name:{
        type:String,
        required: true
    },
    Email:{
        type: Email,
        required: true
    }
});










const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;