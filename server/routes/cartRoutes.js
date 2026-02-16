const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { protect } = require("../middleware/authMiddleware");

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, cartItems: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
router.post("/", protect, async (req, res) => {
  const { product, name, image, price, quantity, size } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, cartItems: [] });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product === product,
    );

    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      // Add new product
      cart.cartItems.push({ product, name, image, price, quantity, size });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
router.put("/:id", protect, async (req, res) => {
  // Note: :id here refers to the PRODUCT ID (sanity ID), not the sub-document ID
  // or we can use sub-document ID if we prefer
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product === req.params.id,
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product !== req.params.id,
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
