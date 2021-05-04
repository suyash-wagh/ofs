const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniquename = `${Math.round(Math.random()*1E9)}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniquename);
    },
   
});

let upload = multer({
    storage,
    limit: {filesize: 1000000*100},

}).single('file0');

router.post('/', (req, res) => {
    // Storing file
    upload(req, res, async(err) =>{
         //request validation
        if (!req.file){
            return res.json({error: 'File not uploaded.'});
        }
        if(err){
            return res.status(500).send({error:err.message})
        }
        //Storing in the datatbase
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size,
        });

        const response= await file.save();
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});

    });
    
});
module.exports= router;