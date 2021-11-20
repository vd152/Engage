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