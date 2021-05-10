require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
var uuid = require('uuid');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// Upload a file to S3
function uploadFile(file){
    var idFoto = uuid();    // Generando id para la foto
    var llaveFoto = "productos/" + idFoto + ".jpg";

    var img = fs.readFileSync(file.path);
    var encode_image = img.toString('base64');
    var image = new Buffer.from(encode_image, 'base64')

    const uploadParams = {
        Bucket: bucketName,
        Body: image,
        Key: llaveFoto,
        ContentType: "image",
        ACL: 'public-read'
    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

// Download a file from S3

function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream
