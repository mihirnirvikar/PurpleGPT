const UserModel = require("../models/authModel");

const getUserInfo = async(req, res) => {
    try {
        const {userId} = req.user;
        
        const user = await UserModel.findOne({_id: userId});

        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userDetails = {
            name: user.name,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
        }

        return res.status(200).json({message: "User details fetched successfully", data: userDetails});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = {
    getUserInfo
}
