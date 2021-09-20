const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v1;
const path = require('path');

const {
  AWS_S3_NAME,
  AWS_S3_SECRET_KEY,
  AWS_S3_ACCESS_KEY,
  AWS_S3_REGION
} = require('../configs/configs');

const bucket = new S3({
  region: AWS_S3_REGION,
  accessKeyId: AWS_S3_ACCESS_KEY,
  secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
  uploadImage: (file, itemType, itemId) => {
    const { name, data, mimetype } = file;
    const uploadPath = _fileNameBuilder(name, itemType, itemId.toString());

    return bucket
      .upload({
        Bucket: AWS_S3_NAME,
        Body: data,
        Key: uploadPath,
        ContentType: mimetype
      })
      .promise();
  },
  deleteImage: (image_s3_key) => bucket
    .deleteObject({
      Bucket: AWS_S3_NAME,
      Key: image_s3_key,
    })
    .promise()

};

function _fileNameBuilder(fileName, itemType, itemId) {
  const fileExtension = fileName.split('.').pop();

  return path.join(itemType, itemId, `${uuid()}.${fileExtension}`);
}
