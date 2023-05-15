require("dotenv").config();
const { User } = require("../models/tables");
const { SECRET } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id,
    },
    SECRET,
    {
      expiresIn: "2 Days",
    }
  );
};

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        console.log("user already exists");
        res.sendStatus(400)
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username: username,
          hashedPass: hash,
        });
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        console.log(newUser);
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token,
          exp,
        });
      }
    } catch (err) {
      console.log("Error registering");
      console.log(err);
      res.sendStatus(400);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        if (isAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token,
            exp,
          });
        } else {
          res.sendStatus(400);
        }
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log(err);
      console.log("Error in logging in");
      res.sendStatus(400);
    }
  },
};
