const express = require('express');
const router = express.Router();
const API = require("../controllers/api");
const multer = require("multer");

// multer middleware

let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("img");

router.get('/', API.allBook);
router.get('/:id', API.oneBook);
// router.get('/search', API.searchBook);
router.post('/', upload, API.create);
router.patch('/:id', upload, API.update);
router.delete('/:id', upload, API.delete);

module.exports = router;