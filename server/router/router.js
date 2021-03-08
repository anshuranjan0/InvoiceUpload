const route = require('express').Router()
const controller = require('../controller/controller');
const store = require('../middleware/multer')

//routes
route.get('/', controller.home)
//route to access uploads
//multiple file upload requires array
//for single file will need to use single
//second argument of array specifies max # of images for upload
route.post('/uploadmultiple', store.array('images', 5), controller.uploads )

module.exports = route;


