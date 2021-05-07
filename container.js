const dependable = require('dependable');
const path = require('path');
const formidable = require('formidable');

const container = dependable.container();

const simpleDependencies = [
    ['_', 'lodash'],
    ['mongoose', 'mongoose'],
    ['passport', 'passport'],
    ['formidable','formidable'],
    ['async', 'async'],
    ['Group','./models/groups'],
    ['aws','./helperss/AWSUpload'],
    ['multer', 'multer']
];

simpleDependencies.forEach(function(val){
    container.register(val[0], function(){
        return require(val[1]);
    })
});

container.load(path.join(__dirname, '/controllerss'));
container.load(path.join(__dirname, '/helperss'));

container.register('container', function(){
    return container;
});

module.exports = container;
