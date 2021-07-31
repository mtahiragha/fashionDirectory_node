const express = require('express');
const router = express.Router();
const { Catalogue } = require('../models/catalogue');
let { SOME_THONG_WENTWRONG, SUCCESS, INVALID_INPUT } = require('../helpers/app_messages');

const multer = require('multer');
const { getStorage } = require('../helpers/upload.helper')

const basePath = './public/uploads/catalogues';
const baseUrl = 'http://localhost:3200/uploads/catalogues';

const uploadImage = multer({
    storage: getStorage(`${basePath}/images`),
    limits: {
        fileSize: 1000000,
    }
}).single('images');

const uploadVideos = multer({
    storage: getStorage(`${basePath}/videos`),
    limits: {
        fileSize: 1000000,
    }
}).array('videos');

const uploadCatalogueImages = multer({
    storage: getStorage(`${basePath}/catalogueImages`),
    limits: {
        fileSize: 1000000,
    }
}).array('catalogueImages');

router.post("/upload_images", async (req, res) => {
    await uploadImage(req, res, function (err) {
        if (err) {
            SOME_THONG_WENTWRONG.message = "Something went wrong.."
            return res.status(200).send(SOME_THONG_WENTWRONG);
        }

        file.fullPath = `${baseUrl}/images/${req.file.filename}`;

        SUCCESS.file = req.file;
        return res.status(200).send(SUCCESS);

    });
});

router.post("/upload_videos", async (req, res) => {
    await uploadImage(req, res, function (err) {
        if (err) {
            SOME_THONG_WENTWRONG.message = "Something went wrong.."
            return res.status(200).send(SOME_THONG_WENTWRONG);
        }

        req.files.forEach(file => {
            file.fullPath = `${baseUrl}/videos/${file.filename}`;
        });

        SUCCESS.files = req.files;
        return res.status(200).send(SUCCESS);

    });
});

router.post("/upload_catalogue_images", async (req, res) => {
    await uploadCatalogueImages(req, res, function (err) {
        if (err) {
            SOME_THONG_WENTWRONG.message = "Something went wrong.."
            return res.status(200).send(SOME_THONG_WENTWRONG);
        }

        req.files.forEach(file => {
            file.fullPath = `${baseUrl}/catalogueImages/${file.filename}`;
        });

        SUCCESS.files = req.files;
        return res.status(200).send(SUCCESS);

    });
});

router.get("/:id", async (req, res) => {
    try {

        if (!req.params.id) {
            return res.status(400).send(INVALID_INPUT);
        }

        let result = await Catalogue.find({ _id: req.params.id });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.get("/", async (req, res) => {
    try {

        let result = await Catalogue.find({ active: true });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.post("/", async (req, res) => {

    try {
        let { title, catalogue_id, created_by, brand, tags, catalogue_videos } = req.body;

        if (!title || !catalogue_id || !catalogue_id || !created_by || !brand || !tags || !catalogue_videos) {
            return res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;

        data.created_at = new Date();
        data.updated_at = new Date();

        let result = await new Catalogue(data).save();

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.put("/", async (req, res) => {
    try {

        let { title, catalogue_id, created_by, brand, tags, catalogue_videos } = req.body;

        if (!title || !catalogue_id || !catalogue_id || !created_by || !brand || !tags || !catalogue_videos) {
            return res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;
        data.updated_at = new Date();
        let result = await Catalogue.findByIdAndUpdate(data.id, data);

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }

});

router.delete("/", async (req, res) => {
    return res.status(200).send("Delete Catalogues");
});

module.exports = router;