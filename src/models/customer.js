const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    email_id: {
        type: String,
        required: true,
    },

    fb_id: {
        type: String,
    },

    google_id: {
        type: String,
    },

    first_name: {
        type: String,
        require: true,
    },

    last_name: {
        type: String,
        require: true,
    },

    gender: {
        type: String
    },

    date_of_birth: {
        type: Date
    },

    notifications_enabled: {
        type: Boolean
    },

    geo_location: {
        type: Boolean
    },

    contact_mobile: {
        type: String
    },
    contact_landline: {
        type: String
    },

    liked_brands: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand"
        }
    ],

    liked_catalogues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Catalogue"
        }
    ],

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

    display_image: {
        type: String
    },
});

const Catalogue = new mongoose.model("Catalogue", catalogueSchema);
exports.Catalogue = Catalogue;


