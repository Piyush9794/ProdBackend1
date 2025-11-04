// const UserModel = require('../Model/UserModel.js')
const UserModel = require("../Model/UserModel.");
const ProductModel = require("../Model/ProductModel");
const verifyTOken = require("../Middleware/Token");
const jwt = require("jsonwebtoken");

const UserRegisterController = async (req, res) => {
  // res.send("Working....wwwwwwwwwwwwwwww")
  try {
    const { name, email, password, phone } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        code: 400,
        message: "Please enter a valid email address with @ and domain",
        error: true,
      });
    }
    // if (phone.length == 10) {
    //   return res.json({
    //     success: false,
    //     code: 400,
    //     message: "Phone number must be exactly 10 digits",
    //     error: true,
    //   });
    // }
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      res.json({
        success: false,
        code: 401,
        message: "This Email is Already Exist ",
        isExist,
        error: true,
      });
    } else {
      const data = new UserModel({ name, email, password, phone });
      const result = await data.save();
      // ✅ 5. Token generate karna
      // const token = jwt.sign(
      //   { id: result._id, email: result.email }, // payload
      //   "Piyush@123", // secret key (environment variable me rakhna better)
      //   { expiresIn: "1h" } // expiry time
      // );

      res.json({
        success: true,
        code: 201,
        message: "Register Suucesfully ",
        data: result,
        error: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      code: 501,
      message: "Internal Server Error",
      data: " ",
      error: true,
    });
  }
};

// const UserRegisterController = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.json({
//         success: false,
//         code: 400,
//         message: "Please enter a valid email address with @ and domain",
//         error: true,
//       });
//     }

//     if (phone.length !== 10) {
//       return res.json({
//         success: false,
//         code: 400,
//         message: "Phone number must be exactly 10 digits",
//         error: true,
//       });
//     }

//     const isExist = await UserModel.findOne({ email });
//     if (isExist) {
//       return res.json({
//         success: false,
//         code: 401,
//         message: "This Email already exists",
//         error: true,
//       });
//     }

//     const data = new UserModel({ name, email, password, phone });
//     const result = await data.save();

//     // ✅ token generate
//     // const token = jwt.sign(
//     //   { id: result._id, email: result.email },
//     //   "Piyush@123",
//     //   { expiresIn: "1h" }
//     // );

//     return res.json({
//       success: true,
//       code: 201,
//       message: "Registered successfully",
//       data: result,
//       token, // ✅ send token also
//       error: false,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       code: 501,
//       message: "Internal Server Error",
//       data: " ",
//       error: true,
//     });
//   }
// };

const UpdateUserDetailsControllers = async (req, res) => {
  // res.send("Working....wwwwwwwwwwwwwwww")
  try {
    const { name, email, password, phone } = req.body;
    const result = await UserModel.updateOne(
      { email: email },
      {
        $set: {
          name: name,
          password: password,
          phone: phone,
        },
      }
    );
    res.json({
      success: true,
      code: 200,
      message: "User details updated successfully",
      data: result,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      code: 501,
      message: "Internal Server Error",
      data: " ",
      error: true,
    });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const result = await UserModel.deleteOne({ _id: id });
  res.json({
    success: true,
    code: 200,
    message: "This Email is Delete Succesfully ",
    result,
    error: false,
  });
};
const AllUserController = async (req, res) => {
  const result = await UserModel.find();
  res.json({
    success: true,
    code: 200,
    message: "The User Fetch Succesfully ",
    result,
    error: false,
  });
};

const LoginApi = async (req, res) => {
  // res.send("Login")
  const { email, password } = req.body;
  const result = await UserModel.findOne({ email, password });
   if (result) {
    const token = jwt.sign(
      { id: result.email },                 // payload
      process.env.JWT_SECRET,               // use env variable
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // expiry
    );

    res.json({
      success: true,
      code: 200,
      message: "Login Successfully!",
      data: result,
      token,
      error: false,
    });
  } else {
    res.json({
      success: false,
      code: 404,
      message: "Login Failed!",
      data: result,
      error: true,
    });
  }
};

// const addProductControllers = async (req, res) => {
//   const { name, price, description } = req.body;
//   const img = req.files.img;
//   if (!img) {
//     res.json({
//       success: false,
//       code: 404,
//       message: "image is required !",
//       data: "",
//       error: true,
//     });
//   }
//   img.mv("uploads/" + img.name, (err) => {
//     if (err) {
//       res.json({
//         success: false,
//         code: 404,
//         message: "Error During file upload!",
//         data: "",
//         error: true,
//       });
//     }
//   });
//   const data = new ProductModel({ name, price, description, img: img.name });
//   const result = await data.save();
//   res.json({
//     success: true,
//     code: 200,
//     message: "Product Upload Succesfully!",
//     data: result,
//     error: false,
//   });
// };

const addProductControllers = async (req, res) => {
  try {
    const { name, price, description, email } = req.body;

    // ✅ Check if files exist and use correct field name
    if (!req.files || !req.files.img) {
      return res.json({
        success: false,
        code: 404,
        message: "Image is required!",
        data: "",
        error: true,
      });
    }

    const img = req.files.img;
    const uploadPath = "uploads/" + img.name;

    // ✅ File upload with proper error handling
    img.mv(uploadPath, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.json({
          success: false,
          code: 500,
          message: "Error during file upload!",
          data: "",
          error: true,
        });
      }

      try {
        // ✅ Save to database
        const data = new ProductModel({
          name,
          price,
          description,
          img: img.name,
          email, // 👈 user ka email store karo
        });
        const result = await data.save();

        res.json({
          success: true,
          code: 200,
          message: "Product Upload Successfully!",
          data: result,
          error: false,
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.json({
          success: false,
          code: 500,
          message: "Database error!",
          data: "",
          error: true,
        });
      }
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.json({
      success: false,
      code: 500,
      message: "Internal server error!",
      data: "",
      error: true,
    });
  }
};

const DeleteProductsController = async (req, res) => {
  const { id } = req.params;
  // const id = paramas._id
  // alert(_id);
  const result = await ProductModel.deleteOne({ _id: id });
  res.json({
    success: true,
    code: 200,
    message: "Product Deleted Succesfully !",
    error: false,
    result,
  });
};

// const EditProductsController = async (req, res) => {
//   const {id} = req.params
//   const { name, price, description } = req.body;
//   const img = req.files.img;
//   if (!img) {
//     res.json({
//       success: false,
//       code: 402,
//       message: "Image Required !",
//     });
//   }
//   img.mv("uploads/" + img.name, (err) => {
//     if (err) {
//       res.json({
//         success: false,
//         code: 404,
//         message: "Failed Upload!",
//       });
//     }
//   });
//   const result = await ProductModel.updateOne(
//     { _id: id },
//     { name, price, description, img: img.name }
//   );
//   res.json({
//     code: 200,
//     success: true,
//     message: "Update Details Succesfully ! ",
//     error: false,
//     result,
//   });
// };



const EditProductsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body || {}; // ✅ prevent undefined error

    let updateData = { name, price, description };

    // ✅ Handle new image if uploaded
    if (req.files && req.files.img) {
      const img = req.files.img;
      const imgName = Date.now() + "_" + img.name; // unique name
      await img.mv(`uploads/${imgName}`);
      updateData.img = imgName;
    }

    const result = await ProductModel.updateOne({ _id: id }, updateData);

    if (result.modifiedCount > 0) {
      res.json({
        code: 200,
        success: true,
        message: "Product updated successfully!",
        result,
      });
    } else {
      res.json({
        code: 404,
        success: false,
        message: "Product not found or no changes made.",
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error!",
      error: error.message,
    });
  }
};

const FetchProducts = async (req, res) => {
  try {
    console.log("👉 req.body:", req.body); // check this in terminal

    const { email } = req.body || {};

    if (!email) {
      return res.json({
        success: false,
        code: 400,
        message: "Email is required",
        data: "",
        error: true,
      });
    }

    const result = await ProductModel.find({ email });

    res.json({
      success: true,
      code: 200,
      message: "Fetched successfully",
      data: result,
      error: false,
    });
  } catch (error) {
    console.error("❌ Backend error:", error);
    res.json({
      success: false,
      code: 500,
      message: "Internal server error",
      data: "",
      error: true,
    });
  }
};

module.exports = {
  UserRegisterController,
  deleteUserController,
  UpdateUserDetailsControllers,
  AllUserController,
  LoginApi,
  addProductControllers,
  FetchProducts,
  DeleteProductsController,
  EditProductsController
};
