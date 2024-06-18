const path = require("path");
const multer = require('multer');
let appRoot=require('app-root-path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("Destination Path:"+appRoot + '/source/material/assets/img');
        cb(null,appRoot +'/source/material/assets/img');
       
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        console.log(`Uploading file: ${file.originalname}`);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage:storage}).single('photo')
module.exports =upload