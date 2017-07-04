const express = require("express");
const router = express.Router();
const manifest = require("../public/manifest.json");

router.get("/", (req,res) => {
    res.render("index", {manifest : manifest});
});


module.exports = router;