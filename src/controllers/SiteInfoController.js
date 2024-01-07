const SiteInfoModel = require("../Model/siteInfoModel")

exports.SiteInfoController =async  (req , res) =>{
   
    try{
      const result =  await SiteInfoModel.find();
      res.status(200).json({message:"success", data:result})
    }
    catch(err){
        res.status(404).json({from:'SiteInfoController' ,message:err.message})
    }
}