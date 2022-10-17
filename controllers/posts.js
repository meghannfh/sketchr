const cloudinary = require("../middleware/cloudinary");
const Post = require('../models/Post')
const Prompt = require('../models/Prompt')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id });
            res.render("profile.ejs", { posts: posts, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
    getFeed: async (req, res) => {
        try{
            const posts = await Post.find().sort({ createdAt: 'desc' }).lean()
            const prompt = await Prompt.aggregate([{ $sample: { size: 1 } }])
            res.render('feed.ejs', { posts: posts, prompt: prompt })
        }catch(err){
            console.log(err)
        }
    },
    getPost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id);
        res.render('post.ejs', { post: post })
        }catch(err){
            console.error(err)
        }
    },
    addPost: async (req, res) => {
        try{
            const result = await cloudinary.uploader.upload(req.file.path)

            await Post.create({
                prompt: req.body.prompt,
                media: req.body.media,
                size: req.body.size,
                canvas: req.body.canvas,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                description: req.body.description,
            });
            console.log('Post has been added!')
            res.redirect('/feed')
        }catch(err){
            console.log(err)
        }
    },
    deletePost: async (req, res) => {
        try{
            let post = await Post.findById({ _id: req.params.id })
            await cloudinary.uploader.destroy(post.cloudinaryId)
            await Post.deleteOne({ _id: req.params.id })
            console.log('Post Deleted')
            res.redirect('/feed')
        }catch(err){
            res.redirect('/feed')
        }
    }
}