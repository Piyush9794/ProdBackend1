const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv");
const expressFileupload = require('express-fileupload')
const DbConnect = require('./Config/DbConfig')
const userRouter = require('./Routes/Routes')
const app = express()
// app.use(express.json())
app.use(express.json());
app.use(expressFileupload())
// app.use('/static',express.static('./uploads'))
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
// app.use(cors())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
dotenv.config();
app.use(userRouter)

DbConnect()
const PORT = process.env.PORT || 9000;
 
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});