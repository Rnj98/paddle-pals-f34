require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./util/database");
const { User, Spots } = require("./models/tables");
const { PORT } = process.env;
const {CONNECTION_STRING} = process.env;

const { isAuthenticated } = require("./middleware/isAuth");
const { register, login } = require("./controllers/authCtrl");
const { addSpot, getAllSpots, deleteSpot } = require("./controllers/spotsCtrl");

const app = express();
app.use(express.json());
app.use(cors());

User.hasMany(Spots);
Spots.belongsTo(User);

app.post(`${CONNECTION_STRING}/register`, register);
app.post(`${CONNECTION_STRING}/login`, login);

app.get(`${CONNECTION_STRING}/spots/:userId`, getAllSpots);
app.post(`${CONNECTION_STRING}/spots`, isAuthenticated, addSpot);
app.delete(`${CONNECTION_STRING}/spots/:id`, deleteSpot);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`We ride to ${PORT}`));
  })
  .catch((err) => console.log(err));
