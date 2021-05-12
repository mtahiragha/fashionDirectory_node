const express = require('express');
const router = express.Router();
const { Tag } = require('../models/tag');
let { SOME_THONG_WENTWRONG, SUCCESS, INVALID_INPUT } = require('../helpers/app_messages');

const multer = require('multer');
const { getStorage } = require('../helpers/upload.helper')


const basePath = __dirname + '/uploads/tags';
const baseUrl = 'http://localhost:3200/uploads/tags';

const uploadImage = multer({
    storage: getStorage(`${basePath}/images`),
    limits: {
        fileSize: 1000000,
    }
}).array('images');

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

router.get("/:id", async (req, res) => {
    try {

        if (!req.params.id) {
            return res.status(400).send(INVALID_INPUT);
        }

        let result = await Tag.find({ _id: req.params.id });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.get("/", async (req, res) => {
    try {

        let result = await Tag.find({ active: true });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.post("/", async (req, res) => {

    try {
        let { title, tag_id, is_main, is_catalogue_tag, is_brand_tag, active, created_by } = req.body;

        if (!title || !tag_id || !is_main || !is_catalogue_tag || !is_brand_tag || !active || !created_by) {
            return res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;

        data.created_at = new Date();
        data.updated_at = new Date();

        let result = await new Tag(data).save();

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.put("/", async (req, res) => {
    try {

        let { id, title, tag_id, is_main, is_catalogue_tag, is_brand_tag, active, created_by } = req.body;

        if (!id || !title || !tag_id || !created_by) {
            return res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;
        data.updated_at = new Date();
        let result = await Tag.findByIdAndUpdate(data.id, data);

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }

});

router.delete("/", async (req, res) => {
    return res.status(200).send("Delete Tags");
});

module.exports = router;