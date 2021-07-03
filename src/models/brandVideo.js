import { toInteger } from 'lodash'
import mongoose from 'mongoose'

const bandVideoSchema = new mongoose.Schema.Schema({

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand"
    },

    title: {
        type: string,
        require: true
    },

    category: {
        type: string,
        require: true
    },

    year: {
        type: Number,
        require: true

    },

    season: {
        title: string,
    },

    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            title: String,
            ref: "Tag"
        }
    ],

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

})

const BrandVideo = new mongoose.model('Brand_Videos', branchSchema);

expost.BrandVideo = BrandVideo;