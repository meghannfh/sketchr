const cloudinary = require("../middleware/cloudinary");
const Post = require('../models/Post')
const multer = require('multer')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean();
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
            const artist = await Post.find({ user: req.user.id})
            console.log(artist.userName)
            const post = await Post.findById(req.params.id);
        res.render('post.ejs', { post: post, user: req.user })
        }catch(err){
            console.error(err)
        }
    },
    addPost: async (req, res) => {
        try{
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result)
            let newPost = await Post.create({
                prompt: req.body.prompt,
                media: req.body.media,
                size: req.body.size,
                canvas: req.body.canvas,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                description: req.body.description,
                user: req.user.id,
            });
            res.redirect('/profile')
        }catch(err){
            if (req.fileValidationError) {
                console.log(err)
                res.redirect('/profile')
           }
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
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                { 
                    media: req.body.media,
                    size: req.body.size,
                    canvas: req.body.canvas,
                    description: req.body.description,
                 }
              );
            console.log('Post updated')
            res.redirect(`/post/${req.params.id}`)
        }catch(err){
            res.redirect('/profile')
        }
    },
}