const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customer');

const path = require('path');
const multer = require('multer');

const { getStorage } = require('../helpers/upload.helper')

let { SOME_THONG_WENTWRONG, SUCCESS, INVALID_INPUT } = require('../helpers/app_messages');

const storage = multer.diskStorage({
    destination: './public/uploads/customer/images',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
    }
});

const basePath = __dirname + '/uploads/customers';
const baseUrl = 'http://localhost:3200/uploads/customers';

const uploadImage = multer({
    storage: getStorage(`${basePath}/images`),
    storage: storage,//getStorage(`${basePath}/images`),
    limits: {
        fileSize: 1000000,
    }
}).single('image');

router.post("/upload_image", async (req, res) => {
    await uploadImage(req, res, function (err) {
        if (err) {
            SOME_THONG_WENTWRONG.message = "Something went wrong.."
            return res.status(200).send(SOME_THONG_WENTWRONG);
        }

        req.file.fullPath = `${baseUrl}/images/${req.file.filename}`;
        SUCCESS.file = req.file;
        return res.status(200).send(SUCCESS);

    });
});

router.get("/:id", async (req, res) => {
    try {

        if (!req.params.id) {
            return res.status(400).send(INVALID_INPUT);
        }

        let result = await Customer.find({ _id: req.params.id });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.post("/:id", async (req, res) => {
    try {

        if (!req.params.e) {
            return res.status(400).send(INVALID_INPUT);
        }

        let result = await Customer.find({ _id: req.params.id });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});


router.get("/user_by_email", async (req, res) => {
    try {

        let { email_id } = req.body;

        if (!email_id || !first_name || !last_name || !active || !gender || !date_of_birth) {
            return res.status(400).send(INVALID_INPUT);
        }

        let result = await Customer.find({ active: true, email_id: email_id });

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.post("/", async (req, res) => {

    try {
        let { email_id, first_name, last_name, active, gender, date_of_birth } = req.body;

        if (!email_id || !first_name || !last_name || !active || !gender || !date_of_birth) {
            return res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;

        data.created_at = new Date();
        data.updated_at = new Date();

        let result = await new Customer(data).save();

        SUCCESS.result = result;
        return res.status(200).send(SUCCESS);

    } catch (error) {
        SOME_THONG_WENTWRONG.message = error.message;
        return res.status(400).send(SOME_THONG_WENTWRONG);
    }
});

router.put("/", async (req, res) => {
    try {

        let { email_id, first_name, last_name, active, gender, date_of_birth } = req.body;

        if (!email_id || !first_name || !last_name || !active || !gender || !date_of_birth) {
            return res.status(400).send(INVALID_INPUT);
        }

        var data = req.body;
        data.updated_at = new Date();
        let result = await Customer.findOneAndUpdate(data._id, data);

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