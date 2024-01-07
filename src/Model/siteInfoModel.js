const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    siteName:{type:String},
    siteDes:{type:String},
    message:{type:String}
},{timestamp :true , versionKey : false});

const SiteInfoModel = mongoose.model('SiteInfo' , siteSchema);
module.exports= SiteInfoModel;