const { model } = require("mongoose");
const User = require("../models/User")



const userController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find()
            return res.status(200).json(user);

        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            return res.status(200).json("delete successfully")

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = userController;