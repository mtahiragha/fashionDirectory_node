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
    gender: String,
    date_of_birth: Date,
    notifications_enabled: Boolean,
    geo_location: Boolean,
    contact_mobile: String,
    contact_landline: String,
    liked_brands: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    ],
    liked_catalogues: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Catalogue" },
    ],
    active: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: String,
    display_image: String,
});

const Catalogue = new mongoose.model("Catalogue", catalogueSchema);
exports.Catalogue = Catalogue;


