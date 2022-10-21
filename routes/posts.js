const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer')
const postsController =  require('../controllers/posts')

router.get('/:id', postsController.getPost)
router.post("/addPost", upload.single('file'), postsController.addPost)
router.delete("/deletePost/:id", postsController.deletePost);
router.put("/updatePost/:id", postsController.updatePost)

module.exports = router;