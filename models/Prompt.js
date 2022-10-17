const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
    prompt: {
        type: String,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Prompt", PromptSchema)