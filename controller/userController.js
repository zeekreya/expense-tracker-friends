const user = require("../model/userModel")
const saveUser = async (req, res) => {
    try {
        let body = req.body;
        let userData = await user.create(body);
        res.json({
            success: true,
            message: "user saved successfully",
            data: userData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}
const readUser = async (req, res) => {
    try {
        let query = req.query;
        let userData = await user.find(query).exec();
        res.json({
            message: "user read successfull",
            success: true,
            data: userData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        })
    }

}
const updateUser = async (req, res) => {
    try {
        let query = req.query;
        let body = req.body;
        let userData = await user.findOneAndUpdate(query, body, { new: true }).exec();
        res.json({
            success: true,
            message: "user updated successfully",
            data: userData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        let query = req.query;
        let userData = await user.findOneAndDelete(query).exec();
        res.json({
            success: true,
            message: "user deleted successfully",
            data: userData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}
module.exports = { saveUser, readUser, updateUser, deleteUser };