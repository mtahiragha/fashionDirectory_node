const mongoose = require('mongoose');

const designerCatalogueSchema = new mongoose.Schema({

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

    season: {
        type: String,
        require: true
    },

    year: {
        type: Number,
        require: true
    },


    display_images: [String],

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
    },

    pdf: {
        type: String
    },

    tags: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Tag",
            title: String
        }
    ],

    catalogue_videos: [String]

});

const DesignerCatalogue = new mongoose.model("Designer_Catalogue", designerCatalogueSchema);
exports.DesignerCatalogue = DesignerCatalogue;


