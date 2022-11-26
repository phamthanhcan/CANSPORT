const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class User {
  async getAllUser(req, res) {
    try {
      let users = await userModel
        .find({ userRole: 0 })
        .select(
          "_id name email phone dob address gender userImage status updatedAt createdAt"
        );
      if (users) {
        return res.json({ users });
      }
    } catch (err) {
      return res.status(500);
    }
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
