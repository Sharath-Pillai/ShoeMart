import express from "express";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();


// All cart routes require user authentication
cartRouter.get("/", authUser, getCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.put("/update", authUser, updateCart);
cartRouter.delete("/remove", authUser, removeFromCart);
cartRouter.delete("/clear", authUser, clearCart);

export default cartRouter;
