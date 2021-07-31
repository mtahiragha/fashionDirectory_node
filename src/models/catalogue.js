const mongoose = require('mongoose');

const catalogueSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    catalogue_id: {
        type: String,
        require: true,
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

    rating: {
        type: Number
    },

    display_images: [String],

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
    },

    catalogue_images: [String],

    tags: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Tag",
            title: String
        }
    ],

    catalogue_videos: [String]

});

const Catalogue = new mongoose.model("Catalogue", catalogueSchema);
exports.Catalogue = Catalogue;


