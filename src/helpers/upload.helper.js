
const multer = require('multer');

exports.getStorage = (destinationPath) => {
    const storage = multer.diskStorage({
        destination: destinationPath,
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
        }
    });

    return storage;
}
