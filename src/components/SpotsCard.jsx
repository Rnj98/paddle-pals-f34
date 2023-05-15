import React from "react";
import "./SpotsCard.css";
import axios from "axios";

const SpotsCard = ({ spots, getSpots, searchInput }) => {
  const deleteSpot = (id) => {
    axios
      .delete(`/spots/${id}`)
      .then((res) => {
        console.log(res.data);
        getSpots();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="spots-container">
      {spots
        .filter((spot) => {
          let title = spot.location.toLowerCase();
          let name = spot.spotName.toLowerCase();
          let search = searchInput.toLowerCase();
          return title.includes(search) || name.includes(search);
        })
        .map((spot) => {
          const timeStamp = new Date(spot.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <div key={spot.id} className="spotCard-container">
              <img src={spot.imageUrl} alt="lake" className="spot-image" />
              <h1>{spot.spotName}</h1>
              <p className="parking-lot">
                Parking lot: <span>{spot.parkingLot ? "Yes" : "No"}</span>
              </p>
              <p>{spot.location}</p>
              <p>{timeStamp}</p>
              <button onClick={() => deleteSpot(spot.id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
};

export default SpotsCard;
