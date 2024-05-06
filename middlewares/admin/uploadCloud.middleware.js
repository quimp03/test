const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
cloudinary.config({ 
    cloud_name: "dql6irmti", 
    api_key: "128843521168623",
    api_secret: "PGqmaDQNpNAFEfCVg1zG8VBOwtM"
})
module.exports.uploadSingle =   (req, res, next) => {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.url
            next()
        }
        upload(req);
    }else{
        next()
    }
}