const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tag_id: {
        type: String,
        require: true,
    },
    is_main: Boolean,
    is_catalogue_tag: Boolean,
    is_brand_tag: Boolean,
    active: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: String,
    cover_images: [String],
});

const Tag = new mongoose.model("Tag", tagSchema);
exports.Tag = Tag;