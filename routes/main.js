const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const authController = require("../controllers/auth");
const homeController = require('../controllers/home')
const postsController =  require('../controllers/posts')
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//Main Routes
router.get('/', homeController.getIndex)
router.get('/feed', ensureAuth, postsController.getFeed)
router.get('/profile', ensureAuth, postsController.getProfile)
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.put('/edit/:id', upload.single('profileImage'), authController.editProfile)
router.put('/deletePic/:id', authController.deleteProfilePic)

module.exports = router;