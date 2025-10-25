var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", {
		title: process.env.TASK,
		version: process.env.VERSION,
		port: process.env.port,
		task: process.env.TASK,
	})
})

module.exports = router
