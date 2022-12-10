const passport = require("passport");
const cloudinary = require("../middleware/cloudinary");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log("User has logged out.");
    //moved the req.session.destroy callback inside the req.logout callback to fix error
    req.session.destroy((err) => {
      if (err) console.log("Error : Failed to destroy the session during logout.", err);
      req.user = null;
      res.redirect("/");
    });
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    profileImage: '',
    profileCloudinaryId: ''
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};

exports.editProfile = async (req, res) => {
  let fileErrors = req.flash('errors')
      try{
        const result = await cloudinary.uploader.upload(req.file.path)
        console.log(req.body)
        console.log(result)
          let update = await User.findOneAndUpdate(
              { _id: req.user.id },
              { 
                profileImage: result.secure_url,
                profileCloudinaryId: result.public_id,
               }
            );
          console.log('Profile updated')
          res.redirect(`/profile`)
      }catch(err){
        if (req.fileValidationError) {
          req.flash("errors", {
            msg: "please enter a jpg, jpeg or png file type",
          });
          return res.redirect("../profile");
        } else if (!req.file) {
          req.flash("errors", {
            msg: "please retry with a file selected",
          });
          return res.redirect("../profile");
      }
    }
  }

exports.deletePic = async (req, res) => {
  try{
    let user = await User.findById({ _id: req.params.id })
    await cloudinary.uploader.destroy(user.profileCloudinaryId)
    await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          profileImage: '',
          profileCloudinaryId: '',
        }
      );
    console.log('profile pic deleted')
    res.redirect('/profile')
  }catch(err){
    console.log(err)
    res.redirect('/profile')
  }
}