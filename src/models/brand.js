const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    brand_id: {
        type: String,
        require: true,
        unique: true
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

    likes_count: {
        type: Number,
        default: 0
    },

    cover_images: [String],

    videos: [String],

    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            title: String,
            ref: "Tag"
        }
    ]
});

const Brand = new mongoose.model("Brand", brandSchema);
exports.Brand = Brand;


