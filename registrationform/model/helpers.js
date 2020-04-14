const image=function(req,file,cb){
if(file.originalName.match(/\.(.jpg|JPG|jpeg|JPEG|png|PNG)$/)){
req.fileValidationError='Only this type of formats are allowed';
return cb(new Error('Only image files are allowed'),false);
}
cb(null,true);
};
exports.imageFilter=imageFilter;