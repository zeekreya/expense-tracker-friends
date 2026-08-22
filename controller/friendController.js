const friend = require("../model/friendModel")
const saveFriend = async (req, res) => {
    try {
        let body = req.body;
        if (body.user == body.friend) {
            throw new Error("Cannot send request to self");
        }
        let requestExists = await friend.findOne({
            $or: [
                { user: body.friend, friend: body.user },
                { user: body.user, friend: body.friend }
            ]
        }).exec();
        if (requestExists) {
            throw new Error("User request exists");
        }
        let friendData = await friend.create(body);
        res.json({
            success: true,
            message: "friend saved successfully",
            data: friendData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}
const readFriend = async (req, res) => {
    try {
        let query = req.query;
        let friendData = await friend.find({
            $or: [
                // { user: query.user },
                { friend: query.user, status: { $ne: "accepted" } }
            ]
        }).populate("user friend").exec();
        res.json({
            mesage: "friend read successfull",
            success: true,
            data: friendData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        })
    }

}
const updateFriend = async (req, res) => {
    try {
        let query = req.query;
        let body = req.body;
        let friendData = await friend.findOneAndUpdate(query, body, { new: true }).exec();
        res.json({
            success: true,
            message: "friend updated successfully",
            data: friendData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}
const deleteFriend = async (req, res) => {
    try {
        let query;
        if (req.query.user && req.query.friend) {
            query = {
                $or: [
                    { user: req.query.user, friend: req.query.friend },
                    { user: req.query.friend, friend: req.query.user }
                ]
            };
        } else if (req.query.user) {
            query = {
                $or: [
                    { user: req.query.user },
                    { friend: req.query.user }
                ]
            };
        } else {
            query = req.query;
        }
        let friendData = await friend.findOneAndDelete(query).exec();
        res.json({
            success: true,
            message: "friend deleted successfully",
            data: friendData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        });
    }
}


const getFriends = async (req, res) => {
    try {
        let query = req.query;
        let friendData = await friend.find({
            $or: [
                { user: query.user, status: "accepted" },
                { friend: query.user, status: "accepted" }
            ]
        }).populate("user friend").exec();
        res.json({
            mesage: "friend read successfull",
            success: true,
            data: friendData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
            data: []
        })
    }

}

module.exports = { saveFriend, readFriend, updateFriend, deleteFriend, getFriends };