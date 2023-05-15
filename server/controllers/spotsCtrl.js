const { User, Spots } = require("../models/tables");

module.exports = {
  addSpot: async (req, res) => {
    try {
      const { title, img, park, location, date, userId } = req.body;
      await Spots.create({
        spotName: title,
        imageUrl: img,
        parkingLot: park,
        location,
        date,
        userId,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log("error in add spot");
      console.log(err);
      res.sendStatus(400);
    }
  },

  getAllSpots: async (req, res) => {
    try {
      const { userId } = req.params;
      const spots = await Spots.findAll({ where: {userId} });
      res.status(200).send({spots});
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  deleteSpot: async (req, res) => {
    try {
      const { id } = req.params;
      await Spots.destroy({ where: { id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
};
