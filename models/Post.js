const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    media: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
    },
    canvas: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: new Date,
    },
})

module.exports = mongoose.model("Post", PostSchema)