
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



aws.config.update({
  accessKeyId: 'AKIA55FVDHMK7XAU6A6A',
  secretAccessKey: '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',
  region: 'eu-west-2' 
});

const awsS3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: awsS3,
    bucket: 'lmuchat',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      
      cb(null, file.originalname);
    },
    rename: (fieldName, fileName) => {
      
      return fileName.replace(/\W+/g, '-').toLowerCase();
    }
  })

});

exports.Upload = upload;
