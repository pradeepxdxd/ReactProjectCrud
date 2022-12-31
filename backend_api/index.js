const express = require("express");
const { createOrder } = require("./controllers/order");
const { addAddress, getAddresses } = require("./controllers/address");
const {
  saveProduct,
  searchProducts,
  getProductCategories,
  getProductById,
  updateProductDetails,
  deleteProduct
} = require("./controllers/product");
const router = express.Router();
const { signUp, signIn } = require("./controllers/auth");
const admin = require("./middleware/admin");
const auth = require("./middleware/auth");
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//Auth
router.post("/api/v1/users", signUp);
router.post("/api/v1/auth", signIn);

//Address
router.post("/api/v1/addresses", auth, addAddress);
router.get("/api/v1/addresses", auth, getAddresses);

//Product
router.post("/api/v1/products",upload.single('attach'),saveProduct);
router.get("/api/v1/products", searchProducts);
router.get("/api/v1/products/categories", getProductCategories);
router.get("/api/v1/products/:id", getProductById);
router.put("/api/v1/products/:id", updateProductDetails);
router.delete("/api/v1/products/:id", deleteProduct);

//Custom route by me for searching products
// router.get("/api/v1/products/search/:key", searchProductsByPradeep);

//Order
router.post("/api/v1/orders", auth, createOrder);

module.exports = router;
