const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    tag_id: {
        type: String,
        require: true,
        unique: true
    },

    is_main: {
        type: Boolean
    },

    is_catalogue_tag: {
        type: Boolean
    },

    is_brand_tag: {
        type: Boolean
    },

    active: {
        type: Boolean
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

    created_by: {
        type: String
    },

    cover_images: [String]

});

const Tag = new mongoose.model("Tag", tagSchema);
exports.Tag = Tag;