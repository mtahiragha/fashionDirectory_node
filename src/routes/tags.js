const express = require('express');
const router = express.Router();
const { Tag } = require('../models/tag');

let { SOME_THONG_WENTWRONG, SUCCESS, INVALID_INPUT } = require('../helpers/app_messages');

router.get("/:id", async (req, res) => {
    try {

        if (!req.params.id) {
            res.status(400).send(INVALID_INPUT);
        }

        let result = await Tag.find({ _id: req.params.id });

        SUCCESS.result = result;
        res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.get("/", async (req, res) => {
    try {

        let result = await Tag.find({ active: true });

        SUCCESS.result = result;
        res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.post("/", async (req, res) => {

    try {
        let { title, tag_id, is_main, is_catalogue_tag, is_brand_tag, active, created_by } = req.body;

        if (!title || !tag_id || !is_main || !is_catalogue_tag || !is_brand_tag || !active || !created_by) {
            res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;

        data.created_at = new Date();
        data.updated_at = new Date();

        let result = await new Tag(data).save();

        SUCCESS.result = result;
        res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.put("/", async (req, res) => {
    try {

        let { title, tag_id, is_main, is_catalogue_tag, is_brand_tag, active, created_by } = req.body;

        if (!title || !tag_id || !is_main || !is_catalogue_tag || !is_brand_tag || !active || !created_by) {
            res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;
        data.updated_at = new Date();
        let result = await Tag.findOneAndUpdate(data._id, data);

        SUCCESS.result = result;
        res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        res.status(400).send(SOME_THONG_WENTWRONG);
    }

});

router.delete("/", async (req, res) => {
    res.status(200).send("Delete Tags");
});

module.exports = router;