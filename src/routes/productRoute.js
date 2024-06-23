const { uploadMultiple, uploads } = require("../config/multer");
const {
  createproduct,
  getAllproduct,
  getOneproduct,
  updateproduct,
  deleteproduct,
  
} = require("../controllers/productController");

const router = require("express").Router();


//uploadMultiple
router.post("/create",uploadMultiple , createproduct);
router.get("/getall", getAllproduct); 
router.get("/getone/:id", getOneproduct);
router.put("/update/:id", uploadMultiple, updateproduct);
router.delete("/delete/:id", deleteproduct);


module.exports = router;
