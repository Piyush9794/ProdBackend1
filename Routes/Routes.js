const express = require("express");
const verifyTOken = require('../Middleware/Token.js')
const {
  UserRegisterController,
  deleteUserController,
  UpdateUserDetailsControllers,
  AllUserController,
  LoginApi,
  addProductControllers
  ,FetchProducts,
  DeleteProductsController,
  EditProductsController
} = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.post("/reg",UserRegisterController);
userRouter.post("/login", LoginApi);
userRouter.delete("/del/:id",deleteUserController);
userRouter.put("/Upd", UpdateUserDetailsControllers);
userRouter.get("/getUser", AllUserController);
userRouter.post("/add-Product", addProductControllers);
userRouter.post("/fetch", FetchProducts);
userRouter.delete("/del-prod/:id", DeleteProductsController);
userRouter.put("/Upd-prod/:id", EditProductsController);

module.exports = userRouter;
