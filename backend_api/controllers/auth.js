const bcrypt = require("bcrypt");
const { User, validateUser } = require("./../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { AUTH_TOKEN, ADMIN } = require("../constants");

async function signIn(req, res) {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.send({ "err": 1, "msg": "This email has not been registered!" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.send({ "err": 1, "msg": "Invalid Credentials!" });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      isAdmin: user.role === "admin",
    },
    "1@3456Qw-"
  );

  res.send({
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    isAuthenticated: true,
    token: token,
    err: 0
  });
}

async function signUp(req, res) {
  console.log(req.body);

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res
      .send({ "err": "1", "msg": "Try any other email, this email is already registered!" });
  }

  let userPhone = await User.findOne({ contactNumber: req.body.contactNumber });

  if (userPhone) {
    return res.send({ "err": "1", "msg": "Number Already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, salt),
    });
    const response = await user.save();
    res.send({ "err": 0, "msg": "User Registered" });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}

async function changePassword(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const encryptPassword = await bcrypt.hash(password, 11);
    if (user) {
      const updatedPassword = await User.findOneAndUpdate({ email }, { password : encryptPassword }, { new: true });

      if (updatedPassword) {
        return res.send({ 'err': '0', 'msg': 'Password change successfully' });
      }
      else {
        return res.send({ 'err': '1', 'msg': 'Something went wrong' });
      }
    }
    else {
      return res.send({ 'err': '1', 'msg': 'User not found' });
    }
  }
  catch (err) {
    res.send({ 'err': '1', 'msg': 'Internal Server Error' })
  }
}

module.exports = {
  signUp,
  signIn,
  changePassword
};
