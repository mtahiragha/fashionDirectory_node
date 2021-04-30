const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    brand_id: {
        type: String,
        require: true,
    },
    active: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: String,
    likes_count: { type: Number, default: 0 },
    cover_images: [String],
    videos: [String],
    tags: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
    ]
});

const Brand = new mongoose.model("Brand", brandSchema);
exports.Brand = Brand;


