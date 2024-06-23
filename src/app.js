const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const dbConnect = require("./config/dbConnect");
const ProductRouter = require("./routes/productRoute");
const UserRouter = require("./routes/userRoute");
const {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
  cloudinary,
  deleteMultipleImages,
} = require("./config/cloudinary");
const { uploadSingle, uploadMultiple, upload } = require("./config/multer");

// App initialise
const app = express();

// Connect connect
dbConnect();

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h2>Express server created</h2>");
});

app.post("/image", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadSingleImage(file);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/images", uploadMultiple, async (req, res) => {
  try {
    const file = req.files;
    const result = await uploadMultipleImages(file);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete", async (req, res) => {
  const { public_id } = req.body;
  try {
    const result = await deleteMultipleImages(public_id);
    if (result.ok) {
      return res.json("deleted");
    }
    return res.json("not found");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.use("/api/product", ProductRouter);
app.use("/api/user", UserRouter);

module.exports = app;

//  'my-image/l4yplzxosu76pskmg9n5'
