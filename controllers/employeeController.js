const Request = require("../models/requests");

exports.requestForDocument = async(req,res) => {
    try{
        const request = new Request(req.body);
        const requestSave = await request.save();
        res.status(201).json({msg:"request created and sended",requestSave});
    }catch(err){
        res.status(500).json(err);
    }
};

exports.receivedDocument = async(req,res) => {
    try{
        const document = await Request.findById(req.params.id); 
        res.status(200).json(document);
    }catch(err){
        res.status(500).json(err);
    }
};