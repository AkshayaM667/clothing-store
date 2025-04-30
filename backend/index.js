require("dotenv").config();

const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });
app.use("/images", express.static("upload/images"));

// Models
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
  description: { type: String, default: "No description available." },
  reviews: [{
    username: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }]
});

const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  date: { type: Date, default: Date.now },
});

// Routes
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Upload image
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});

// Add product
app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    description: req.body.description || "No description available.",
    reviews: [],
  });

  await product.save();
  res.json({ success: true, product: req.body.name });
});

// Update product
app.post("/updateproduct", async (req, res) => {
  const { id, description, reviews } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { id: id },
      { $set: { description: description, reviews: reviews } },
      { new: true }
    );
    res.json({ success: true, updatedProduct: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all products
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get single product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

// Signup
app.post("/signup", async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "Existing User found with same email address",
    });
  }

  const cart = {};
  for (let i = 0; i < 301; ++i) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
    wishlist: [],
  });

  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

// Login
app.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });

  if (user && req.body.password === user.password) {
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, errors: "Invalid Credentials" });
  }
});

// New Collections
app.get("/newcollections", async (req, res) => {
  const products = await Product.find({});
  const newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
});

// Popular in Women
app.get("/popularinwomen", async (req, res) => {
  const products = await Product.find({ category: "women" });
  const popular_in_women = products.slice(0, 4);
  res.send(popular_in_women);
});

// Middleware for auth
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "No token provided" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ errors: "Invalid token" });
  }
};

// Cart APIs
app.post("/addtocart", fetchUser, async (req, res) => {
  const userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  const userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  const userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Wishlist APIs
app.post("/addtowishlist", fetchUser, async (req, res) => {
  const { productId } = req.body;

  const user = await Users.findById(req.user.id);
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  const populatedUser = await Users.findById(req.user.id).populate("wishlist");

  res.json({ success: true, wishlist: populatedUser.wishlist });
});

app.post("/removefromwishlist", fetchUser, async (req, res) => {
  const { productId } = req.body;

  const user = await Users.findById(req.user.id);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();

  const populatedUser = await Users.findById(req.user.id).populate("wishlist");

  res.json({ success: true, wishlist: populatedUser.wishlist });
});

app.get("/getwishlist", fetchUser, async (req, res) => {
  const user = await Users.findById(req.user.id).populate("wishlist");
  res.json({ success: true, wishlist: user.wishlist });
});

// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log("🚀 Server listening on port " + port);
  } else {
    console.log("❌ Error: " + error);
  }
});
