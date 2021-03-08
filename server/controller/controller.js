const UploadModel = require('../../model/schema');
const fs = require('fs');

const { response } = require("express");

exports.home = async(req, res) => {
    const all_images = await UploadModel.find()
    res.render('main', {images : all_images})
}

exports.uploads = (req, res, next) => {
    const files = req.files;
    if(!files){
        const error = new Error('Please choose a valid file');
        error.httpStatusCode = 400;
        return next(error)

    }
    //convert images to base64 encoding
    let imgArray = files.map((file) =>{
        files.map
        let img = fs.readFileSync(file.path);
        return encode_image =  img.toString('base64')
    })

  let result =  imgArray.map((src, index)=>{
        //create object to store data in database
        let finalimg = {
            filename : files[index].originalname,
            contentType : files[index].path,
            imageBase64 : src

        }

        let newUpload = new UploadModel(finalimg)

        return newUpload
            .save()
            .then(()=> {
            return {msg : `${files[index].originalname} Image uploaded successfully...!`}
            })
            .catch(error =>{
                if(error){
                    if(error.name === 'MongoError' && error.code === 11000){
                        return Promise.reject({error : `Duplicate ${files[index].originalname}, File already exists `})
                    }

                    return Promise.reject({error : error.message || `Cannot Upload files`})
                }
            })

    })

    // this iterate over all promises and displays
    Promise.all(result)
        .then(msg => {
            res.redirect('/')
        })
        .catch(err =>{
            res.json(err)
        })
    
}