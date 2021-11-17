const Group = require('../models/groupModel');

exports.getGroups = async(req,res) => {

}

exports.addGroup = async(req,res) => {
    const {name, code} = req.body
    if(!name || !code){
        return res.status(422).json({
            success: false,
            message: "Please fill all the required fields."
        })
    }
    let groupExists;
    try{
        groupExists = await Group.findOne({code})
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }
    if(groupExists){
        return res.status(400).json({
            success: false,
            message: "Group code already exists"
        })
    }
    let users  = []
    users.push(req.user._id)
    const group = new Group({name,code, users, createdBy: req.user._id});
    group
     .save()     
     .then(group=>{
        return res.status(200).json({
            success: true, 
            data: group
        })
     })
     .catch(err=>{
        return res.status(500).json({
            success: false, 
            message: "Something went wrong"
        })
     })

}