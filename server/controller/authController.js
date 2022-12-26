const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

class Auth {
  async loginAdmin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email: email, userRole: 1 });
      if (!user) {
        res.status(400).json({
          success: false,
          message: "Email hoặc mật khẩu không chính xác!",
        });
      } else {
        const isMatchPass = await bcrypt.compare(password, user.password);
        if (isMatchPass) {
          const token = jwt.sign(
            { _id: user.id, role: user.userRole },
            JWT_SECRET,
            {
              expiresIn: "60h",
            }
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            encode: encode,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Email hoặc mật khẩu không chính xác!",
          });
        }
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err?.message,
      });
    }
  }

  isAdmin(req, res) {
    const { loggedInUserId } = req.body;
    userModel
      .findById(loggedInUserId)
      .then((user) => {
        if (user.userRole === 0) {
          return res.json({
            isAdmin: false,
          });
        } else {
          return res.json({
            isAdmin: true,
          });
        }
      })
      .catch((err) => {
        return res.status(400);
      });
  }

  getAllUser(req, res) {
    userModel
      .find({})
      .then((allUser) => {
        return res.json({
          users: allUser,
        });
      })
      .catch((err) => {
        return res.json({
          error: err.message,
        });
      });
  }

  signUp(req, res) {
    let { name, email, password, dob, gender, phone, address, userImage } =
      req.body;
    password = bcrypt.hashSync(password);
    userModel
      .findOne({ email: email })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            message: "Email đã tồn tại",
          });
        } else {
          const newUser = new userModel({
            name,
            email,
            password,
            userRole: 0,
            dob,
            gender,
            phone,
            address: address || "",
            userImage,
          });
          newUser
            .save()
            .then((data) => {
              return res.status(201).json({
                success: true,
                message: "Thêm người dùng thành công",
                user: data,
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(501).json({
                success: false,
                message: "Đã có lỗi khi thêm người dùng",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async signIn(req, res) {
    let { email, password } = req.body;

    try {
      const user = await userModel.findOne({
        email: email,
        userRole: 0,
        status: true,
      });
      if (!user) {
        return res.status(400).json({
          message: "Email hoặc mật khẩu không hợp lệ",
        });
      } else {
        const login = await bcrypt.compare(password, user.password);
        if (login) {
          const token = jwt.sign(
            { _id: user.id, role: user.userRole },
            JWT_SECRET,
            {
              expiresIn: "60h",
            }
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            encode: encode,
          });
        } else {
          return res.status(400).json({
            message: "Email hoặc mật khẩu không hợp lệ",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
