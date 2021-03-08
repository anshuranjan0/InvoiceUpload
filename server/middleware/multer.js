const multer = require('multer');

//storage
var stores = multer.diskStorage({
    destination : function(req, file, cb){
        //null --> can pass error message
        //uploads --> uploads folder where all files will be stored
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        //get file extension
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname+'_'+Date.now()+ext)
    }
})

store = multer({
    storage: stores
})

module.exports = store