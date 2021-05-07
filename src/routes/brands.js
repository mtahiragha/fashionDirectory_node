const express = require('express');
const router = express.Router();
const { Brand } = require('../models/brand');

const path = require('path');
const multer = require('multer');

const { getStorage } = require('../helpers/upload.helper')

let { SOME_THONG_WENTWRONG, SUCCESS, INVALID_INPUT } = require('../helpers/app_messages');

const storage = multer.diskStorage({
    destination: './public/uploads/brand/images',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
    }
});

const basePath = __dirname + '/uploads/brand';
const baseUrl = 'http://localhost:3200/uploads/brand';

const uploadImage = multer({
    storage: getStorage(`${basePath}/images`),
    storage: storage,//getStorage(`${basePath}/images`),
    limits: {
        fileSize: 1000000,
    }
}).array('images');

const uploadVideos = multer({
    storage: getStorage(`${basePath}/videos`),
    limits: {
        fileSize: 1000000,
    }
}).array('videos');

const uploadPdfs = multer({
    storage: getStorage(`${basePath}/pdf`),
    limits: {
        fileSize: 1000000,
    }
}).array('pdfs');

router.post("/upload_images", async (req, res) => {
    await uploadImage(req, res, function (err) {
        if (err) {
            SOME_THONG_WENTWRONG.message = "Something went wrong.."
            return res.status(200).send(SOME_THONG_WENTWRONG);
        }

        req.files.forEach(file => {
            file.fullPath = `${baseUrl}/images/${file.filename}`;
        });

        SUCCESS.files = req.files;
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

router.post("/upload_pdfs", async (req, res) => {
    await uploadImage(req, res, function (err) {
        if (err) {
            SOME_THONG_WENTWRONG.message = "Something went wrong.."
            return res.status(200).send(SOME_THONG_WENTWRONG);
        }

        req.files.forEach(file => {
            file.fullPath = `${baseUrl}/pdf/${file.filename}`;
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

        let result = await Brand.find({ _id: req.params.id });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.get("/", async (req, res) => {
    try {

        let result = await Brand.find({ active: true });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.post("/", async (req, res) => {

    try {
        let { title, brand_id, active, created_by, cover_images, videos, tags } = req.body;

        if (!title || !brand_id || !active || !created_by || !cover_images || !videos || !tags) {
            return res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;

        data.created_at = new Date();
        data.updated_at = new Date();

        let result = await new Brand(data).save();

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.put("/", async (req, res) => {
    try {

        let { title, brand_id, active, created_by, cover_images, videos, tags } = req.body;

        if (!title || !brand_id || !active || !created_by || !cover_images || !videos || !tags) {
            return res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;
        data.updated_at = new Date();
        let result = await Brand.findOneAndUpdate(data._id, data);

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }

});

router.delete("/", async (req, res) => {
    return res.status(200).send("Delete Brands");
});

module.exports = router;