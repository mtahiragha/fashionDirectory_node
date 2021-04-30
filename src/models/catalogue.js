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
    active: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: String,
    likes_count: { type: Number, default: 0 },
    rating: Number,
    display_images: [String],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    pdf: String,
    tags: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
    ],
    catalogue_videos: [String],
});

const Catalogue = new mongoose.model("Catalogue", catalogueSchema);
exports.Catalogue = Catalogue;


