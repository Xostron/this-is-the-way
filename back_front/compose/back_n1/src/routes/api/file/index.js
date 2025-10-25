// const upload = require("./upload")
// const list = require("./list")
// const del = require("./del")
// const get = require("./get")
// const download = require("./download")
// const update = require("./update")
const isAuth = require("@middlew/is_auth")

function file(router, db) {
	router.use(isAuth())
	// router.post("/file/upload", upload(db))
	// router.get("/file/list", list(db))
	// router.delete("/file/delete/:id", del(db))
	// router.get("/file/:id", get(db))
	// router.get("/file/download/:id", download(db))
	// router.put("/file/update/:id", update(db))
}

module.exports = file
