const mongoose = require("mongoose");
const friendSchema = new mongoose.Schema({
user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
            default: "pending"
    }
}, { timestamps: true });

friendSchema.index({ user: 1, friend: 1 }, { unique: true });
const friendModel = mongoose.model("friend", friendSchema);
module.exports = friendModel;