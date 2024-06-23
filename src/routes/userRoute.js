const router = require("express").Router();

router.post("/create");
router.get("/getall");
router.get("/getone");
router.put("/update/:id");
router.delete("/delete/:id");

module.exports = router;
