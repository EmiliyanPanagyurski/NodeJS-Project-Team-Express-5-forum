const multer = require('multer');

const init = () => {
    return multer.diskStorage({
        destination: function(req, file, callback) {
        callback(null, './static/images/uploads');
        },
        filename: function(req, file, callback) {
        callback(null, req.user[0]._id + file.originalname);
        },
    });
};

module.exports = { init };

