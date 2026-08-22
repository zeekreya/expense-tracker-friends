const expense = require("../model/expenceModel")
const saveExpence = async (req, res) => {
    try {
        let body = req.body;
        let amount = body.amount;
        let perHeadAmount = amount / body.friends.length;

        for (let i = 0; i < body.friends.length; i++) {
            if (body.friends[i] == body.user) {
                continue;
            }
            let userData = await expense.findOne({ user: body.user, friend: body.friends[i] }).exec();
            let friendData = await expense.findOne({ friend: body.user, user: body.friends[i] }).exec();
            await expense.findOneAndUpdate({ user: body.user, friend: body.friends[i] }, { amount: (userData?.amount ?? 0) + perHeadAmount }, { new: true, upsert: true }).exec();
            await expense.findOneAndUpdate({ friend: body.user, user: body.friends[i] }, { amount: (friendData?.amount ?? 0) - perHeadAmount }, { new: true, upsert: true }).exec();
        }
        res.json({
            success: true,
            message: "expense saved successfully",
            data: []
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}
const readExpence = async (req, res) => {
    try {
        let query = req.query;
        let expenceData = await expense.find(query).populate("friend user").exec();
        res.json({
            mesage: "expense read successfull",
            success: true,
            data: expenceData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        })
    }

}
const updateExpence = async (req, res) => {
    try {
        let query = req.query;
        let body = req.body;
        let expenceData = await expense.findOneAndUpdate(query, body, { new: true }).exec();
        res.json({
            success: true,
            message: "expense updated successfully",
            data: expenceData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}
const deleteExpence = async (req, res) => {
    try {
        let query = req.query;
        let expenceData = await expense.findOneAndDelete(query).exec();
        res.json({
            success: true,
            message: "expense deleted successfully",
            data: expenceData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}
module.exports = { saveExpence, readExpence, updateExpence, deleteExpence };