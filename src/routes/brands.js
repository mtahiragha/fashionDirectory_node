const express = require('express');
const router = express.Router();
const { Brand } = require('../models/brand');

const path = require('path');
const multer = require('multer');

const imagePath = './public/uploads/brands/images';
const imageUrl = 'http://localhost:3200/uploads/brands/images';

let { SOME_THONG_WENTWRONG, SUCCESS, INVALID_INPUT } = require('../helpers/app_messages');

const storage = multer.diskStorage({
    destination: imagePath,
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    }
}).single('image');

router.post("/upload", (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(200).send("ERROR");
        }
        req.file.fullpath = `${imageUrl}/${req.file.filename}`;
        SUCCESS.result = req.file;
        res.status(200).send(SUCCESS);
    });
});

// router.post("/upload1", upload.array('image'), (req, res) => {

//     req.files.forEach(file => {
//         file.fullpath = `${imageUrl}/${file.filename}`;
//     });

//     SUCCESS.uploaded = req.files.length;
//     SUCCESS.result = req.files;
//     res.status(200).send(SUCCESS);

// });

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

// router.post("/upload", async (req, res) => {
//     upload(req, res, function (err) {
//         if (err) {
//             return res.status(400).send(err);
//         } else {
//             console.log(req.file);
//             res.send("test file is uploaded...");
//         }


//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any

//         // if (req.fileValidationError) {
//         //     return res.send(req.fileValidationError);
//         // }
//         // else if (!req.file) {
//         //     return res.send('Please select an image to upload');
//         // }
//         // else if (err instanceof multer.MulterError) {
//         //     return res.send(err);
//         // }
//         // else if (err) {
//         //     return res.send(err);
//         // }

//         // Display uploaded image for user validation
//         //res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);

//     });
// });



module.exports = router;