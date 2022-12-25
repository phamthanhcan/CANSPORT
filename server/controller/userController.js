const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const { getPagination } = require("../config/function");

class User {
  async getAllUser(req, res) {
    try {
      let users = await userModel
        .find({ userRole: 0 })
        .select(
          "_id name email phone dob address gender userImage status updatedAt createdAt"
        );
      if (users) {
        return res.status(200).json({
          success: true,
          message: "Lấy danh sách người dùng thành công",
          users,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getListUser(req, res) {
    const { page, size, name, active } = req.query;
    const { limit, offset } = getPagination(page, size);
    let sort = { _id: -1 };
    let query = {};

    if (name) {
      query = {
        ...query,
        name: new RegExp(name, "i"),
      };
    }

    if (active) {
      query = {
        ...query,
        status: true,
      };
    }

    const options = {
      limit,
      offset,
      sort,
    };

    userModel
      .paginate({ ...query, userRole: 0 }, options)
      .then((data) => {
        res.status(200).json({
          success: true,
          totalItems: data.totalDocs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
          users: data.docs,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message:
            err.message ||
            "Đã xảy ra một số lỗi khi truy xuất dữ liệu người dùng",
        });
      });
  }

  async getSingleUser(req, res) {
    let userId = req.params.userId;
    if (!userId) {
      return res.status(404).json({ error: "All filled must be required" });
    } else {
      try {
        let user = await userModel
          .findById(userId)
          .select(
            "_id name email phone dob address gender userImage updatedAt createdAt"
          );
        if (user) {
          return res.json({ user });
        }
      } catch (err) {
        return res.status(500);
      }
    }
  }

  async postEditUser(req, res) {
    const userId = req.params.userId;
    let { name, phone, dob, address, gender, userImage } = req.body;
    if (!userId || !name || !phone || !dob || !address) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(userId, {
        name,
        phone,
        dob,
        address,
        gender,
        userImage,
      });
      currentUser.exec((err, result) => {
        if (err) return res.status(500);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async deleteUser(req, res) {
    const id = req.params.userId;
    userModel
      .findByIdAndUpdate(id, { status: false })
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          err: err.message,
        });
      });
  }

  async changePassword(req, res) {
    let userId = req.params.userId;
    let { oldPassword, newPassword } = req.body;
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: userId });
      if (!data) {
        return res.status(400).json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword);
          let passChange = userModel.findByIdAndUpdate(userId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) return res.status(500);
            return res.json({ success: "Password updated successfully" });
          });
        } else {
          return res.status(400).json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }
}

const usersController = new User();
module.exports = usersController;
