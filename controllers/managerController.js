const Request = require("../models/requests");

exports.requestsReceived = async(req,res) => {
    try{
        const document = await Request.findById(req.params.id);
        res.status(200).json({msg:"request read by HR",document});
    }catch(err){
        res.status(500).json(err);
    }
};

exports.sendDocument = async(req,res) => {
    try{
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    "status": req.body.status,
                    "docfile": req.file.filename
                }
            },
            {new:true}
        );
        res.status(200).json({msg:"document sent to employee",request});
    }catch(err){
        res.status(500).json(err);
    }
};








