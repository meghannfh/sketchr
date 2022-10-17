const Prompt = require('../models/Prompt')

module.exports = {
    addPrompt: async (req, res) => {
        try {
            await Prompt.create({
                prompt: req.body.prompt,
              });
              console.log("prompt has been added!");
              res.redirect("/feed");
        }catch (err) {
            console.log(err)
        }
    }
}