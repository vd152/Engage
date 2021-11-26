const Role = require('../models/roleModel');

exports.getRoles = async(req,res) => {
    Role
     .find().then(role=>{
        res.status(200).json({
          success: true,
          role
        })
      }).catch(err=>{
        return res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      })
}
exports.addRole = async(req, res) => {
    const {name, permissions} = req.body;

    if(!name){
        return res.status(422).json({
            success: false,
            message: "Please fill all the required fields."
        })
    }
    let roleExists;
    try{
        roleExists = await Role.findOne({name})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }

    if(roleExists){
        return res.status(400).json({
            success: false,
            message: "Role already exists"
        })
    }

    const role = new Role({name, permissions});
    role
     .save()
     .then(role=>{
        return res.status(200).json({
            success: true, 
            role
        })
     })
     .catch(err=>{
        return res.status(500).json({
            success: false, 
            message: "Something went wrong"
        })
     })
}

exports.deleteRole = async(req, res) => {
    const id = req.body.id
    Role.deleteOne({_id: id}).then(data=>{
        return res.status(200).json({
            success: true, 
            data
        })
    }).catch((err) => {
        return res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      });

}

exports.editRole = async(req, res) => {
    const {role} = req.body
    const id = req.params.id

    let foundRole;
    try{
        foundRole = await Role.findOne({_id: id})
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }
    if(!foundRole){
        return res.status(404).json({
            success: false,
            message: "Role not found."
          })
    }

    let newRole = {foundRole, ...role};

    Role.findOneAndUpdate({_id: id}, {$set: newRole}, {new: true}).then(updatedrole=>{
        return res.status(200).json({
          success: true,
          role: updatedrole
        })
      }).catch(err=>{
        return res.status(500).json({
          success: false,
          message: "something went wrong"
        })
      })
}