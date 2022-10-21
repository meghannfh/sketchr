const cloudinary = require("../middleware/cloudinary");
const Post = require('../models/Post')
const Prompt = require('../models/Prompt')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id });
            console.log((new Date).getMonth()+1)
            res.render('profile.ejs', { posts: posts, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
    getFeed: async (req, res) => {
        try{
            const posts = await Post.find().sort({ createdAt: 'desc' }).lean()
            res.render('feed.ejs', { posts: posts, user: req.user })
        }catch(err){
            console.log(err)
        }
    },
    getPost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id);
        res.render('post.ejs', { post: post, user: req.user })
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
                user: req.user.id,
            });
            console.log('Post has been added!')
            res.redirect('/profile')
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
            res.redirect('/profile')
        }catch(err){
            res.redirect('/profile')
        }
    },
    updatePost: async (req, res) => {
        try{
            await Post.findById({ _id: req.params.id })
            const id = req.params.id
            await Post.findOneAndUpdate(
               id,
                { 
                prompt: req.body.prompt,
                media: req.body.media,
                size: req.body.size,
                canvas: req.body.canvas,
             })
            console.log('Post updated')
            res.redirect('/profile')
        }catch(err){
            res.redirect('/profile')
        }
    },
}