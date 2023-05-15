require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./util/database");
const { User, Spots } = require("./models/tables");

const { PORT } = process.env;

const { isAuthenticated } = require("./middleware/isAuth");
const { register, login } = require("./controllers/authCtrl");
const { addSpot, getAllSpots, deleteSpot } = require("./controllers/spotsCtrl");

const app = express();
app.use(express.json());
app.use(cors());

User.hasMany(Spots);
Spots.belongsTo(User);

app.post("/register", register);
app.post("/login", login);

app.get("/spots/:userId", getAllSpots);
app.post("/spots", isAuthenticated, addSpot);
app.delete("/spots/:id", deleteSpot);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`We ride to ${PORT}`));
  })
  .catch((err) => console.log(err));
