const mongoose = require("mongoose");
const expenceSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

expenceSchema.index({ user: 1, friend: 1 }, { unique: true });
const expence = mongoose.model("expence", expenceSchema);
module.exports = expence;