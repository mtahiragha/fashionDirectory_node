const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    brand: {
        typre: string,
        require: true
    },

    user: {
        typre: string,
        require: true
    },

    comments: {
        type: text
    },

    create_at: {
        type: Date,
        default: Date.now
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

})

const Message = new mongoose.model('Message', messageSchema);
exports.Message = Message;